function printTrip() {
  const tripData = document.getElementById("trip-data").innerHTML;
  const printWindow = window.open("", "", "height=600,width=800");
  printWindow.document.write("<html><head><title>Print Trip</title>");
  printWindow.document.write(
    "<style>body{font-family: Arial, sans-serif; margin: 20px;}</style>"
  );
  printWindow.document.write("</head><body >");
  printWindow.document.write(tripData);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
}

export { printTrip };
