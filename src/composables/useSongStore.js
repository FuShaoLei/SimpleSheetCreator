import { reactive, ref } from 'vue'

let _id = 0
function uid() {
  return ++_id
}

const song = reactive({
  title: '',
  key: 'G',
  bpm: 120,
  sections: [],
})

const activeLineId = ref(null)
const activeSectionId = ref(null)
const focusedInputElement = ref(null)

function createLine(type, data = {}) {
  const line = { id: uid(), type }
  if (type === 'grid') {
    line.content = data.content || ''
  } else if (type === 'chord-lyric') {
    line.chords = data.chords || ''
    line.lyrics = data.lyrics || ''
  } else if (type === 'lyric') {
    line.text = data.text || ''
  }
  return line
}

function addSection(label) {
  // Auto-number: count existing sections with same label
  const count = song.sections.filter(s => s.label === label).length
  const section = {
    id: uid(),
    label,
    labelIndex: count + 1,
    lines: [],
  }
  song.sections.push(section)
  activeSectionId.value = section.id
  return section
}

function removeSection(sectionId) {
  const idx = song.sections.findIndex(s => s.id === sectionId)
  if (idx !== -1) {
    song.sections.splice(idx, 1)
    // Re-number remaining sections with same label
    renumberSections()
    if (activeSectionId.value === sectionId) {
      activeSectionId.value = song.sections.length > 0
        ? song.sections[Math.min(idx, song.sections.length - 1)].id
        : null
    }
  }
}

function renumberSections() {
  const counts = {}
  song.sections.forEach(s => {
    if (!counts[s.label]) counts[s.label] = 0
    counts[s.label]++
    s.labelIndex = counts[s.label]
  })
}

function moveSectionUp(sectionId) {
  const idx = song.sections.findIndex(s => s.id === sectionId)
  if (idx > 0) {
    const tmp = song.sections[idx]
    song.sections[idx] = song.sections[idx - 1]
    song.sections[idx - 1] = tmp
    renumberSections()
  }
}

function moveSectionDown(sectionId) {
  const idx = song.sections.findIndex(s => s.id === sectionId)
  if (idx < song.sections.length - 1) {
    const tmp = song.sections[idx]
    song.sections[idx] = song.sections[idx + 1]
    song.sections[idx + 1] = tmp
    renumberSections()
  }
}

function findSection(sectionId) {
  return song.sections.find(s => s.id === sectionId)
}

function addLine(sectionId, type, afterLineId = null, data = {}) {
  const section = findSection(sectionId)
  if (!section) return null
  const line = createLine(type, data)
  if (afterLineId) {
    const idx = section.lines.findIndex(l => l.id === afterLineId)
    section.lines.splice(idx + 1, 0, line)
  } else {
    section.lines.push(line)
  }
  return line
}

function removeLine(sectionId, lineId) {
  const section = findSection(sectionId)
  if (!section) return
  const idx = section.lines.findIndex(l => l.id === lineId)
  if (idx !== -1) {
    section.lines.splice(idx, 1)
    if (activeLineId.value === lineId) {
      activeLineId.value = section.lines.length > 0
        ? section.lines[Math.min(idx, section.lines.length - 1)].id
        : null
    }
  }
}

function insertChordAtCursor(chordName) {
  const el = focusedInputElement.value
  if (!el) return
  const start = el.selectionStart
  const end = el.selectionEnd
  const value = el.value
  const before = value.substring(0, start)
  const after = value.substring(end)

  // Find which section/line owns this input
  for (const section of song.sections) {
    for (const line of section.lines) {
      let targetProp = null
      if (line.type === 'grid') targetProp = 'content'
      else if (line.type === 'chord-lyric') targetProp = 'chords'
      else if (line.type === 'lyric') targetProp = 'text'

      if (targetProp && line[targetProp] === value) {
        line[targetProp] = before + chordName + ' ' + after
        // Restore cursor position after Vue updates
        requestAnimationFrame(() => {
          const pos = start + chordName.length + 1
          el.value = line[targetProp]
          el.setSelectionRange(pos, pos)
          el.focus()
        })
        return
      }
    }
  }

  // Fallback: just insert into the raw input value
  el.setRangeText(chordName + ' ', start, end, 'end')
}

function generateTxt() {
  const parts = []
  if (song.title) {
    parts.push(song.title)
    parts.push(`Key: ${song.key}  BPM: ${song.bpm}`)
    parts.push('')
  }

  song.sections.forEach(section => {
    const label = section.labelIndex > 1 || song.sections.filter(s => s.label === section.label).length > 1
      ? `[${section.label} ${section.labelIndex}]`
      : `[${section.label}]`
    parts.push(label)

    section.lines.forEach(line => {
      if (line.type === 'grid') {
        parts.push(line.content)
      } else if (line.type === 'chord-lyric') {
        if (line.chords) parts.push(line.chords)
        if (line.lyrics) parts.push(line.lyrics)
      } else if (line.type === 'lyric') {
        parts.push(line.text)
      }
    })

    parts.push('')
  })

  return parts.join('\n').trimEnd()
}

async function copyToClipboard() {
  const text = generateTxt()
  await navigator.clipboard.writeText(text)
}

function exportTxt() {
  const text = generateTxt()
  const filename = (song.title || 'untitled').replace(/[^a-zA-Z0-9]/g, '_') + '.txt'
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function generateBarLine(input) {
  if (!input.trim()) return ''
  const chords = input.trim().split(/\s+/)
  return chords.map(c => `| ${c} `).join('') + '|'
}

function insertBarLine(chordString) {
  const sectionId = activeSectionId.value
  const section = findSection(sectionId)
  if (!section) {
    // If no section exists, do nothing
    return null
  }
  const barLine = generateBarLine(chordString)
  if (!barLine) return null
  const line = addLine(sectionId, 'grid', null, { content: barLine })
  return line
}

function importLyrics(text, sectionId) {
  const section = findSection(sectionId)
  if (!section) return
  const lines = text.split('\n').filter(l => l.trim() !== '')
  lines.forEach(l => {
    addLine(sectionId, 'chord-lyric', null, { chords: '', lyrics: l.trim() })
  })
}

export function useSongStore() {
  return {
    song,
    activeLineId,
    activeSectionId,
    focusedInputElement,
    addSection,
    removeSection,
    moveSectionUp,
    moveSectionDown,
    addLine,
    removeLine,
    insertChordAtCursor,
    generateTxt,
    copyToClipboard,
    exportTxt,
    generateBarLine,
    insertBarLine,
    importLyrics,
  }
}
