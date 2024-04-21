import { Request } from "express";
import noteModel from "../model/noteModel";

// Return all notes
const findAllNotes = async () => {
    return noteModel.find();
}

// Return a note bt Id
const findById = async (req: Request) => {
    return noteModel.findById(req.params.id);
}

// Create a new Note
const createNotes = async (req: Request) => {

    const newNote = new noteModel(req.body);
    await newNote.save();
    return newNote;

}

// Update existing note by Id
const updateNote = async (req: Request) => {
    return noteModel.findByIdAndUpdate(req.params.id,
        { ...req.body, updatedAt: new Date() },
        { new: true }
    );

}

// Delete a node by Id
const deleteNote = async (req: Request) => {
    return noteModel.findByIdAndDelete(req.params.id);
}

export { findAllNotes, findById, createNotes, updateNote, deleteNote }