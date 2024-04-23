import { findAllNotes, findById, createNotes, updateNote, deleteNote } from "../../repository/notesRepository"
import noteModel from "../../model/noteModel"
import { Request } from "express";

const mockedNotes = [
    { title: 'Test title 1', body: 'My Awesome test' },
    { title: 'Test title 2', body: 'My Test note' },
];

const mockedNote = {
    title: 'Test Title',
    body: 'My Test body',
}

const emptyNote: any = [];

describe("repository", () => {

    describe("Find all notes", () => {

        it("Should return all notes", async () => {

            const findAllNotesMock = jest.fn().mockResolvedValue(mockedNotes);
            noteModel.find = findAllNotesMock;

            const result = await findAllNotes();

            expect(findAllNotesMock).toHaveBeenCalledWith();
            expect(result).toEqual(mockedNotes);
        });
    });

    describe("Find a note by Id", () => {

        describe("provided a valid Id", () => {

            it("Should return a note", async () => {

                const findNoteMock = jest.fn().mockResolvedValue(mockedNote);
                noteModel.findById = findNoteMock;

                const req: Request = { params: { id: 1 } } as unknown as Request

                const result = await findById(req);

                expect(findNoteMock).toHaveBeenCalledWith(1);
                expect(result).toEqual(mockedNote);
            });
        });

        describe("provided a not valid Id", () => {

            it("Should return a empty note array", async () => {

                const findNoteMock = jest.fn().mockResolvedValue(emptyNote);
                noteModel.findById = findNoteMock;

                const req: Request = { params: { id: 1 } } as unknown as Request

                const result = await findById(req);

                expect(findNoteMock).toHaveBeenCalledWith(1);
                expect(result).toEqual(emptyNote);
            });
        });
    })

    describe("Create a note", () => {

        describe("Provided a new note", () => {
            it("Should save the note", async () => {
                const createdNote = jest.fn().mockResolvedValue(mockedNote);
                const req: Request = { body: mockedNote } as unknown as Request

                noteModel.prototype.save = createdNote

                const result = await createNotes(req);

                expect(result).toEqual(expect.objectContaining(mockedNote));
            });
        });
    });

    describe("Update a note", () => {

        describe("Provided a valid Id", () => {

            it("Should update the note", async () => {
                const findNoteAndUpdateMock = jest.fn().mockResolvedValue(mockedNote);
                const req: Request = { params: { id: 1 }, body: mockedNote } as unknown as Request

                noteModel.findByIdAndUpdate = findNoteAndUpdateMock

                const result = await updateNote(req);

                expect(result).toEqual(expect.objectContaining(mockedNote));
                expect(findNoteAndUpdateMock).toHaveBeenCalled();

            });
        });
    });

    describe("delete a note", () => {

        describe("Provided a valid Id", () => {

            it("Should delete the note", async () => {
                const findByIdAndDelete = jest.fn().mockResolvedValue(mockedNote);
                const req: Request = { params: { id: 1 }, body: mockedNote } as unknown as Request

                noteModel.findByIdAndDelete = findByIdAndDelete

                const result = await deleteNote(req);

                expect(result).toEqual(expect.objectContaining(mockedNote));
                expect(findByIdAndDelete).toHaveBeenCalled();

            });
        });
    });
});