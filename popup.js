document.addEventListener('DOMContentLoaded', function() {
    const chooseCoursesButton = document.getElementById('chooseCoursesButton');
    const tutorialLink = document.getElementById('openTutorial');
    
    const tutorialUrl = chrome.runtime.getURL('tutorial.html');

    // Grote knop: opent zowel Canvas als de tutorial
    if (chooseCoursesButton) {
        chooseCoursesButton.addEventListener('click', function() {

            window.open(tutorialUrl, '_blank');
        });
    }

    // Tutorial link: opent alleen de tutorial
    if (tutorialLink) {
        tutorialLink.addEventListener('click', function() {
            window.open(tutorialUrl, '_blank');
        });
    }
});