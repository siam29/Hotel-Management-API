const request = require("supertest");
const server = require("../server");

describe("Hotel API Endpoints", () => {
  afterAll((done) => {
    server.close(done); // Close the server after all tests
  });

  it("GET /hotels - should return a list of hotels", async () => {
    const response = await request(server).get("/hotels");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /hotels/:id - should return a hotel by ID", async () => {
    const newHotel = {
      title: "Test Hotel",
      location: "Test City",
      rooms: 5,
      rating: 4.5,
    };

    const postResponse = await request(server).post("/hotels").send(newHotel);
    const hotelId = postResponse.body.id;

    const response = await request(server).get(`/hotels/${hotelId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(hotelId);
  });

  it("POST /hotels - should create a new hotel", async () => {
    const newHotel = {
      title: "New Hotel",
      location: "New City",
      rooms: 10,
      rating: 4.0,
    };

    const response = await request(server).post("/hotels").send(newHotel);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe(newHotel.title);
  });

  it("PUT /hotels/:id - should update an existing hotel", async () => {
    const newHotel = {
      title: "Hotel to Update",
      location: "Old Location",
      rooms: 5,
      rating: 3.0,
    };

    const postResponse = await request(server).post("/hotels").send(newHotel);
    const hotelId = postResponse.body.id;

    const updatedHotel = {
      title: "Updated Hotel",
      location: "New Location",
      rooms: 6,
      rating: 4.5,
    };

    const putResponse = await request(server).put(`/hotels/${hotelId}`).send(updatedHotel);
    expect(putResponse.status).toBe(200);
    expect(putResponse.body.title).toBe(updatedHotel.title);
    expect(putResponse.body.location).toBe(updatedHotel.location);
  });

  it("POST /images - should upload images and update hotel", async () => {
    const newHotel = {
      title: "Image Test Hotel",
      location: "Image City",
      rooms: 5,
      rating: 4.1,
    };

    const postResponse = await request(server).post("/hotels").send(newHotel);
    const hotelId = postResponse.body.id;

    const imageResponse = await request(server)
      .post("/images")
      .field("hotelId", hotelId.toString())
      .attach("images", Buffer.from("dummy content"), { filename: "test.jpg" });

    expect(imageResponse.status).toBe(200);
    expect(imageResponse.body.message).toBe("Images uploaded successfully");
    expect(imageResponse.body.images[0]).toContain("/uploads/");
    expect(imageResponse.body.images[0]).toMatch(/\d{13}-test.jpg/);
  });
});
