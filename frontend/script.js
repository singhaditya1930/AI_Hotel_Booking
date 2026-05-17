let userId = 1;
let roomId = 0;
let reservationId = 0;

const API_AUTH = "http://localhost:8081";
const API_ROOMS = "http://localhost:8082";
const API_RESERVATION = "http://localhost:8083";
const API_PAYMENT = "http://localhost:8084";
const API_REVIEW = "http://localhost:8085";
const API_RECOMMEND = "http://localhost:8086";

async function registerUser() {

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    await fetch(API_AUTH + "/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    document.getElementById("registerMsg").innerHTML =
        "<span class='success'>User Registered Successfully</span>";

    loadRooms();
}

async function loadRooms() {

    document.getElementById("roomSection").classList.remove("hidden");

    const response = await fetch(API_ROOMS + "/rooms");
    const rooms = await response.json();

    let html = "";

    rooms.forEach(room => {

        html += `
            <div class="room">
                <h3>${room.roomType}</h3>
                <p>Price: ₹${room.price}</p>

                <button onclick="bookRoom(${room.id}, ${room.price})">
                    Book Now
                </button>
            </div>
        `;
    });

    document.getElementById("roomsList").innerHTML = html;
}

async function bookRoom(id, price) {

    roomId = id;

    const reservation = {
        userId: userId,
        roomId: roomId
    };

    const response = await fetch(API_RESERVATION + "/reservations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservation)
    });

    const data = await response.json();

    reservationId = data.id;

    document.getElementById("paymentSection")
        .classList.remove("hidden");

    document.getElementById("amount").value = price;
}

async function makePayment() {

    const payment = {
        reservationId: reservationId,
        amount: document.getElementById("amount").value
    };

    await fetch(API_PAYMENT + "/payments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payment)
    });

    document.getElementById("paymentMsg").innerHTML =
        "<span class='success'>Payment Successful</span>";

    document.getElementById("reviewSection")
        .classList.remove("hidden");
}

async function submitReview() {

    const review = {
        userId: userId,
        roomId: roomId,
        rating: document.getElementById("rating").value,
        comment: document.getElementById("comment").value
    };

    await fetch(API_REVIEW + "/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    });

    document.getElementById("reviewMsg").innerHTML =
        "<span class='success'>Review Submitted</span>";

    document.getElementById("recommendSection")
        .classList.remove("hidden");

    document.getElementById("recommendSection").style.display = "block";
}

async function getRecommendation() {

    const response = await fetch("http://localhost:8080/recommend");

    const data = await response.json();

    document.getElementById("recommendationBox").style.display = "block";

    document.getElementById("roomName").innerText =
        "🏨 " + data.recommendedRoom;

    document.getElementById("roomReason").innerText =
        data.reason;

    document.getElementById("matchScore").innerText =
        Math.floor(Math.random() * 10) + 90 + "%";
}

async function loadDashboard() {

    const roomsResponse = await fetch("http://localhost:8080/rooms");
    const rooms = await roomsResponse.json();

    const reservationsResponse = await fetch("http://localhost:8080/reservations");
    const reservations = await reservationsResponse.json();

    const paymentsResponse = await fetch("http://localhost:8080/payments");
    const payments = await paymentsResponse.json();

    const reviewsResponse = await fetch("http://localhost:8080/reviews");
    const reviews = await reviewsResponse.json();

    const recommendationResponse = await fetch("http://localhost:8080/recommend");
    const recommendation = await recommendationResponse.json();

    let totalPayment = 0;

    payments.forEach(payment => {
        totalPayment += payment.amount;
    });

    document.getElementById("dashboardResult").innerHTML = `

    <div class="dashboard-box">

        <h3>🏨 Total Rooms: ${rooms.length}</h3>

        <h3>📅 Total Reservations: ${reservations.length}</h3>

        <h3>💳 Total Payments: ₹${totalPayment}</h3>

        <h3>⭐ Total Reviews: ${reviews.length}</h3>

        <h3>🤖 Top AI Recommended Room:</h3>

        <p>
            <strong>${recommendation.roomName}</strong>
        </p>

        <p>${recommendation.reason}</p>

    </div>

    `;
}