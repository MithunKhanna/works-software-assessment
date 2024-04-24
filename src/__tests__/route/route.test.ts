import supertest = require("supertest");
import createServer from "../../util/server";
import exp = require("constants");

const app = createServer();

const validId = '6623e8c926c97af5b1367fc1';
const notValidId = '6623e8c926c97af5b1367fc2';

const mockedNote = {
    title: 'Test Title',
    body: 'My Test body',
}

describe("note route", () => {

    describe("Get all notes", () => {
        it("Should get all notes", async () =>{
            await supertest(app).get('/api/v1/note').expect(200);
        });
    });

    describe("Get a note by id", () => {

        describe("Provided a valid id", () => {

            it("Should get a note", async () => {
                await supertest(app).get(`/api/v1/note/${validId}`).expect(200);
            });
        });

        describe("Provide not valid id", () => {
            it("Should return statusCode 404", async () => {
                await supertest(app).get(`/api/v1/note/${notValidId}`).expect(404);
            });
        });
    });

    describe("Create a note", () => {

        it("Should create a note", async () => {
            const {statusCode, body} = await supertest(app).post(`/api/v1/note`).send(mockedNote);

            expect(statusCode).toBe(201);
            expect(body).toEqual(expect.objectContaining(mockedNote));
            await deleteNote(body._id);
        });
    });

    describe("Update a note", () => {

        describe("Provided a valid id", () => {

            it("Should update a note", async () => {
                const {statusCode, body} = await supertest(app).put(`/api/v1/note/${validId}`).send(mockedNote);

                expect(statusCode).toBe(200);
                expect(body).toEqual(expect.objectContaining(mockedNote));
            });
        });

        describe("Provide not valid id", () => {
            it("Should return statusCode 404", async () => {
                await supertest(app).put(`/api/v1/note/${notValidId}`).send(mockedNote).expect(404);
            });
        });
    });


    describe("Delete a note", () => {

        describe("Provided a valid id", () => {

            it("Should delete a note", async () => {
                const id = await createNote();
                await supertest(app).delete(`/api/v1/note/${id}`).expect(200);
            });
        });

        describe("Provided a not valid id", () => {

            it("Should return statusCode 404", async () => {
                await supertest(app).delete(`/api/v1/note/${notValidId}`).expect(404);
            })
        })
    })
});


const deleteNote = async (id: String) => {
    await supertest(app).delete(`/api/v1/note/${id}`);
}

const createNote = async () => {
    const {body} = await supertest(app).post(`/api/v1/note`);

    return body._id;
}