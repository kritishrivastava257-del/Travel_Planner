const calculateBtn = document.getElementById("calculateBtn");

calculateBtn.addEventListener("click", () => {

  const days = Number(document.getElementById("days").value);

  const people = Number(document.getElementById("people").value);

  const hotel = Number(document.getElementById("hotel").value);

  const food = Number(document.getElementById("food").value);

  const transport = Number(document.getElementById("transport").value);

  if (
    !days ||
    !people ||
    !hotel ||
    !food ||
    !transport
  ) {
    alert("Please fill all fields");
    return;
  }

  // Calculations
  const hotelExpense = hotel * days;

  const foodExpense = food * people * days;

  const total =
    hotelExpense +
    foodExpense +
    transport;

  // Display Results
  document.getElementById("hotelResult").textContent =
    `₹${hotelExpense}`;

  document.getElementById("foodResult").textContent =
    `₹${foodExpense}`;

  document.getElementById("transportResult").textContent =
    `₹${transport}`;

  document.getElementById("totalResult").textContent =
    `₹${total}`;

  // Show Result Box
  document
    .getElementById("resultBox")
    .classList.remove("hidden");

});