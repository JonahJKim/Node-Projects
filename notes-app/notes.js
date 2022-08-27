const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.bold('New note added!'))
    }
    else {
        console.log(chalk.red.bold('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const upload = notes.filter((word) => word.title !== title
    )

    if (notes.length > upload.length) {
        console.log(chalk.bold.blue("Note removed!"))
    }
    else {
        console.log(chalk.bold.red("Note not removed!"))
    }
    saveNotes(upload)
}

const listNotes = () => {
    const notes = loadNotes()
    notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
    notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note.title.length > 0) {
        console.log(chalk.blue.bold('Title: ' + note.title))
        console.log('Body: ' + note.body)
    } else {
        console.log('Note not found!')
    }
}


const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString())
    }
    catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}