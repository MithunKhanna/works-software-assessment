import express, {Request, Response} from 'express';
import { findAllNotes, findById, createNotes, updateNote, deleteNote } from '../repository/NotesRepository';
import { HTTP_STATUSCODES } from '../constants/httpStatusCodes';

const router = express.Router();

// Find all notes
router.get('/', async (req: Request, res: Response) => {

    try {
        const notes = await findAllNotes();
        if(notes != null && notes.length == 0){
            res.status(HTTP_STATUSCODES.OK).json({message: `No notes present, please create a new note!`})
        }
        res.status(HTTP_STATUSCODES.OK).json(notes);
    } catch (error) {
        res.status(HTTP_STATUSCODES.INTERNAL_SERVER_ERROR).json({message: error})
    }
});

// Find a note by id
router.get('/:id', async (req: Request, res: Response) => {
    try{
        const note = await findById(req);
        if(!note){
            res.status(HTTP_STATUSCODES.NOT_FOUND).json({message: `Note with id: ${req.params.id} not found`})
        }
        res.status(HTTP_STATUSCODES.OK).json(note);
    } catch (error) {
        res.status(HTTP_STATUSCODES.INTERNAL_SERVER_ERROR).json({message: error})
    }
});

// Create a note
router.post('/', async (req: Request, res: Response) => {
    try {
        const createdNote = await createNotes(req);
        res.status(HTTP_STATUSCODES.OK).json(createdNote);
    } catch (error) {
        res.status(HTTP_STATUSCODES.INTERNAL_SERVER_ERROR).json({message: error})
    }
});

// Update a note by id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updatedNote = await updateNote(req);
        if(!updatedNote){
            res.status(HTTP_STATUSCODES.NOT_FOUND).json({message: `Note with id: ${req.params.id} not found`})
        }
        res.status(HTTP_STATUSCODES.OK).json(updatedNote);
    } catch (error) {
        res.status(HTTP_STATUSCODES.INTERNAL_SERVER_ERROR).json({message: error})
    }
});

// Delete a note by id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedNote = await deleteNote(req);
        console.log(deletedNote);
        if(!deletedNote){
            res.status(HTTP_STATUSCODES.NOT_FOUND).json({message: `Note with id: ${req.params.id} not found`})
        } else
            res.status(HTTP_STATUSCODES.OK).json(deletedNote);
    } catch (error) {
        res.status(HTTP_STATUSCODES.INTERNAL_SERVER_ERROR).json({message: error});
    }
});

export default router;