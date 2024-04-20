import { Request } from "express";
import noteModel from "../model/noteModel";


const findAllNotes = async () => {
    return noteModel.find();
}

const findById = async (req: Request) => {
    return noteModel.findById(req.params.id);

}

const createNotes = async (req: Request) => {

    const newNote = new noteModel(req.body);
    await newNote.save();
    return newNote;

}

const updateNote = async (req: Request) => {
    return noteModel.findByIdAndUpdate(req.params.id,
        { ...req.body, updatedAt: new Date() },
        { new: true }
    );

}

const deleteNote = async (req: Request) => {
    return noteModel.findByIdAndDelete(req.params.id);
}

export { findAllNotes, findById, createNotes, updateNote, deleteNote }