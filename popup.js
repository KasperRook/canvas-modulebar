document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the "Choose Favourite Courses" button
    const chooseCoursesButton = document.getElementById('chooseCoursesButton');
    if (chooseCoursesButton) {
        chooseCoursesButton.addEventListener('click', function() {
            // Opens the specified Canvas courses page
            window.open('https://canvas.uva.nl/courses', '_blank'); 
        });
    }
});

