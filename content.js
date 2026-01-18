window.addEventListener('load', function() {
    // --- Configuration for Static Sidebar Colors (in rgb format) ---
    const sidebarStaticColors = {
        background: 'rgb(255, 255, 255)',                  // Main sidebar background (white)
        text: 'rgb(100, 100, 100)',                        // Main text color (dark gray/black)
        //headerBackground: 'rgb(209, 209, 209)',          // Sidebar header background (very light gray)
        binnenknopje: 'rgb(0, 0, 0)',                      // Sidebar header text (and close button icon)
        moduleHeaderBackground: 'rgb(233, 233, 233)',      // Module section header background (off-white)
        moduleHeaderText: 'rgb(59, 59, 59)',               // Module section header text
        moduleHeaderHoverBackground: 'rgb(233, 236, 239)', // Module section header hover background (light gray)
        moduleLinkText: 'rgb(33, 37, 41)',                 // Standard module link text
        
        // AANGEPAST: Terug naar donkere kleur
        moduleLinkActiveBackground: '#273540',             // Background for active module links
        moduleLinkActiveText: 'white',                     // Text for active module links
        
        iconColor: 'rgb(85, 85, 85)',                      // Color for icons within module links (medium gray)
        activeIconColor: 'white',                          // Color for icons when module is active
        
        borderColor: 'rgb(222, 226, 230)',                 // Border color for elements
        openButtonBackground: 'transparent',               // Background for the 'open sidebar' button
        openButtonText: '#273540',                         // Text for the 'open sidebar' button
        scrollBarThumb: 'rgb(193, 193, 193)',              // Scrollbar thumb color
        scrollBarTrack: 'rgb(241, 241, 241)'               // Scrollbar track color
    };

    // Function to remove the specified support buttons
    function removeSupportButtons() {
        const selectors = [
            '.eesy-tab-custom-container',
            '.eesy.eesy-tab-custom-container.eesy-tab-display-type-floating',
            '#eesy-tab-custom-inner'
        ];
        selectors.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.remove();
            }
        });
    }

    // Initial call to remove support buttons
    removeSupportButtons();

    // Create a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                let needsRemoval = false;
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.matches && (node.matches('.eesy-tab-custom-container') || node.matches('#eesy-tab-custom-inner'))) {
                            needsRemoval = true;
                            break;
                        }
                        if (node.querySelector && (node.querySelector('.eesy-tab-custom-container') || node.querySelector('#eesy-tab-custom-inner'))) {
                            needsRemoval = true;
                            break;
                        }
                    }
                }
                if (needsRemoval) {
                    removeSupportButtons();
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
        
    const newSidebarContainer = document.createElement('div');
    const newSidebarWidth = '364px';
    newSidebarContainer.id = 'custom-sidebar-container';
    newSidebarContainer.style.position = 'fixed';
    newSidebarContainer.style.top = '0';
    newSidebarContainer.style.left = '0';
    newSidebarContainer.style.width = '448px';
    newSidebarContainer.style.height = '100vh';
    newSidebarContainer.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';
    newSidebarContainer.style.zIndex = '99'; 
    newSidebarContainer.style.display = 'none';
    newSidebarContainer.style.transition = 'transform 0.25s ease-out';
    newSidebarContainer.style.transform = `translateX(-${newSidebarWidth})`;
    newSidebarContainer.style.overflowY = 'scroll';
    newSidebarContainer.style.boxShadow = 'rgba(0, 0, 0, 0.25) 0px 0px 1.75rem';
    newSidebarContainer.style.clipPath = 'inset(0 -1.75rem 0 0)';
    newSidebarContainer.style.backgroundColor = sidebarStaticColors.background;

    const newSidebar = document.createElement('div');
    newSidebar.id = 'custom-sidebar';
    newSidebar.style.marginLeft = '84px';
    newSidebar.style.padding = '1.5rem';
    newSidebar.style.color = sidebarStaticColors.text;
    newSidebar.style.boxSizing = 'border-box';
        
    newSidebarContainer.appendChild(newSidebar);
        
    const sidebarHeader = document.createElement('h2');
    sidebarHeader.textContent = 'Modules';
    sidebarHeader.style.fontFamily = 'LatoWeb, "Lato Extended", Lato, "Helvetica Neue", Helvetica, Arial, sans-serif';
    sidebarHeader.style.fontSize = '1.375rem';
    sidebarHeader.style.fontWeight = '700';
    sidebarHeader.style.color = '#002855';
    sidebarHeader.style.lineHeight = '1.25';
    sidebarHeader.style.margin = '0';
        
    const sidebarBreak = document.createElement('hr');
    sidebarBreak.style.margin = '20px 0';
    sidebarBreak.style.border = '0';
    sidebarBreak.style.borderTop = '1px solid #e8eaec';
    sidebarBreak.style.borderBottom = 'none';

    newSidebar.appendChild(sidebarHeader);
    newSidebar.appendChild(sidebarBreak);

    const elementsToMove = []; // Elements that should move with the sidebar

    // --- NIEUWE KNOP IMPLEMENTATIE IN GLOBAL HEADER (REPLACES LOGO) ---
    let thirdToggleButton = null; 

    // Zoek de containers
    const navContainer = document.querySelector('.ic-app-header__main-navigation');
    const existingLogo = document.querySelector('.ic-app-header__logomark-container');

    if (navContainer) {
        // Maak een div aan die zich gedraagt als een menu-item
        const customContainer = document.createElement('div');
        customContainer.classList.add('menu-item', 'ic-app-header__menu-list-item');
        // Zorg dat hij de breedte vult en padding correct afhandelt
        customContainer.style.width = '100%';
        customContainer.style.boxSizing = 'border-box';
        
        // Maak de link aan (<a>)
        const link = document.createElement('a');
        link.classList.add('ic-app-header__menu-list-link');
        link.style.cursor = 'pointer';

        // Maak de icoon container
        const iconContainer = document.createElement('div');
        iconContainer.classList.add('menu-item-icon-container');
        iconContainer.setAttribute('aria-hidden', 'true');

        // Maak het icoon (Rechts Pijltje)
        const iconDiv = document.createElement('div');
        iconDiv.innerHTML = '&#8594;'; 
        iconDiv.style.fontSize = '26px';
        iconDiv.style.lineHeight = '1';
        iconDiv.style.textAlign = 'center';
        
        iconContainer.appendChild(iconDiv);

        // Maak de tekst container
        const textDiv = document.createElement('div');
        textDiv.classList.add('menu-item__text');
        textDiv.textContent = 'Modules';

        // Voeg alles samen
        link.appendChild(iconContainer);
        link.appendChild(textDiv);
        customContainer.appendChild(link);

        // PLAATSING LOGICA
        if (existingLogo) {
            // Vervang het bestaande logo
            existingLogo.replaceWith(customContainer);
        } else {
            // Als er geen logo is, zet hem helemaal bovenaan de navigatie
            navContainer.prepend(customContainer);
        }
        
        thirdToggleButton = customContainer; // Dit is het element waarop we klikken/hoveren
        
        // Voeg event listener toe aan de container
        thirdToggleButton.addEventListener('mouseover', openSidebar);
    } else {
        console.warn("Custom Script: Global Navigation (.ic-app-header__main-navigation) niet gevonden.");
    }

    let sidebarVisible = false;
    let allowCloseOnDocumentReEnter = false;

    function openSidebar() {
        if (sidebarVisible) return;
        sidebarVisible = true;
        allowCloseOnDocumentReEnter = false;

        // Maak de knop 'actief' door de Canvas class toe te voegen (witte achtergrond)
        if (thirdToggleButton) {
            thirdToggleButton.classList.add('ic-app-header__menu-list-item--active');
        }
                
        newSidebarContainer.style.display = 'block';
        newSidebarContainer.style.transform = `translateX(-${newSidebarWidth})`; // Ensure starting position for animation
        
        requestAnimationFrame(() => { // Next frame to trigger transition
            newSidebarContainer.style.transform = 'translateX(0)';
            elementsToMove.forEach(element => {
                if (element) element.style.transform = `translateX(${newSidebarWidth})`;
            });
        });
        restoreScrollPosition();
    }

    function closeSidebar() {
        if (!sidebarVisible) return;
        sidebarVisible = false;
        allowCloseOnDocumentReEnter = false;

        saveScrollPosition();
        newSidebarContainer.style.transform = `translateX(-${newSidebarWidth})`;
        elementsToMove.forEach(element => {
            if (element) element.style.transform = 'translateX(0)';
        });

        function afterCloseTransition() {
            if (!sidebarVisible) { // Check state again in case of rapid toggles
                newSidebarContainer.style.display = 'none';
                                
                // Verwijder de actieve class weer
                if (thirdToggleButton) {
                    thirdToggleButton.classList.remove('ic-app-header__menu-list-item--active');
                }
            }
            newSidebarContainer.removeEventListener('transitionend', afterCloseTransition);
        }
        newSidebarContainer.addEventListener('transitionend', afterCloseTransition);

        // Fallback timeout in case transitionend doesn't fire (e.g., element removed or display:none too early)
        setTimeout(() => {
            if (!sidebarVisible && newSidebarContainer.style.display !== 'none') {
                newSidebarContainer.style.display = 'none';
                                
                if (thirdToggleButton) {
                    thirdToggleButton.classList.remove('ic-app-header__menu-list-item--active');
                }
                                
                newSidebarContainer.removeEventListener('transitionend', afterCloseTransition);
            }
        }, 300); // Should be slightly longer than transition duration
    }

    newSidebarContainer.addEventListener('mouseenter', function() {
        allowCloseOnDocumentReEnter = false;
    });

    newSidebarContainer.addEventListener('mouseleave', function(event) {
        if (!sidebarVisible) return;

        const isLeavingViewport = event.clientX <= 0 || event.clientY <= 0 ||
                                  event.clientX >= window.innerWidth || event.clientY >= window.innerHeight;

        if (isLeavingViewport) {
            allowCloseOnDocumentReEnter = true;
            document.documentElement.addEventListener('mouseover', handleDocumentReEnterForClose, { once: true });
        } else {
            if (!event.relatedTarget) {
                allowCloseOnDocumentReEnter = true;
                document.documentElement.addEventListener('mouseover', handleDocumentReEnterForClose, { once: true });
            } else if (!newSidebarContainer.contains(event.relatedTarget) &&
                       thirdToggleButton && !thirdToggleButton.contains(event.relatedTarget) ) {
                closeSidebar();
            }
        }
    });

    function handleDocumentReEnterForClose(event) {
        if (sidebarVisible && allowCloseOnDocumentReEnter) {
            if (!newSidebarContainer.contains(event.target) &&
                thirdToggleButton && !thirdToggleButton.contains(event.target)) {
                closeSidebar();
            }
        }
        allowCloseOnDocumentReEnter = false;
    }

    function saveScrollPosition() {
        const scrollPosition = newSidebarContainer.scrollTop;
        if (chrome && chrome.storage && chrome.storage.local) {
            chrome.storage.local.set({ 'sidebarScrollPosition': scrollPosition });
        }
    }

    function restoreScrollPosition() {
        if (chrome && chrome.storage && chrome.storage.local) {
            chrome.storage.local.get(['sidebarScrollPosition'], function(result) {
                if (result && result.sidebarScrollPosition !== undefined) {
                    newSidebarContainer.scrollTop = result.sidebarScrollPosition;
                }
            });
        }
    }
    
    function shadeColor(color, percent) {
        var f = parseInt(color.slice(1), 16),
            t = percent < 0 ? 0 : 255,
            p = Math.abs(percent);
        var R = f >> 16,
            G = f >> 8 & 0x00FF,
            B = f & 0x0000FF;
        var newR = Math.min(255, Math.max(0, Math.round((t - R) * p) + R));
        var newG = Math.min(255, Math.max(0, Math.round((t - G) * p) + G));
        var newB = Math.min(255, Math.max(0, Math.round((t - B) * p) + B));
        return "#" + (0x1000000 + newR * 0x10000 + newG * 0x100 + newB).toString(16).slice(1);
    }

    function getModuleItemId(url) {
        try {
            const urlObj = new URL(url, window.location.origin);
            let moduleItemId = urlObj.searchParams.get('module_item_id');
            if (moduleItemId) return moduleItemId;

            const pathParts = urlObj.pathname.split('/');
            const itemsIndex = pathParts.indexOf('items');
            if (itemsIndex !== -1 && itemsIndex + 1 < pathParts.length) {
                return pathParts[itemsIndex + 1];
            }
        } catch (e) {
            console.warn("Could not parse URL for module item ID:", url, e);
        }
        return null;
    }

    console.log("Custom Script: Initializing...");

    const existingBreadcrumbs = document.querySelector('.ic-app-crumbs');
    if (existingBreadcrumbs) {
        existingBreadcrumbs.remove();
        console.log("Custom Script: Removed existing breadcrumbs div");
    }

    let barContainer; // This is the top course navigation bar, not the sidebar itself

    fetch('/courses/') // Relative URL assuming same origin
        .then(response => {
            if (response.ok) return response.text();
            throw new Error('Network response was not ok for /courses/.');
        })
        .then(htmlText => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlText;
            const courseRows = tempDiv.querySelectorAll('.course-list-table-row');

            if (courseRows.length === 0) {
                console.log("Custom Script: No course rows found.");
                return;
            }

            barContainer = document.createElement('div');
            barContainer.id = 'custom-course-bar-container';
            barContainer.style.position = 'fixed';
            barContainer.style.top = '0';
            barContainer.style.left = '0'; // Will be adjusted by sidebar
            barContainer.style.width = '100%';
            barContainer.style.height = '37px';
            barContainer.style.backgroundColor = '#F8F9FA'; // Light theme for course bar
            barContainer.style.zIndex = '98'; // Below sidebar, above page content
            barContainer.style.transform = 'translateX(0)';
            barContainer.style.transition = 'top 0.3s ease-in-out, transform 0.25s ease-out';
            barContainer.style.borderBottom = '1px solid #DEE2E6'; // Light border
            barContainer.style.boxSizing = 'border-box';
            elementsToMove.push(barContainer); // Add to elements that shift with sidebar

            const newCrumbsDiv = document.createElement('div');
            newCrumbsDiv.classList.add('custom-course-list-bar');
            newCrumbsDiv.style.position = 'absolute';
            newCrumbsDiv.style.top = '0px';
            newCrumbsDiv.style.left = '80px'; // Space for potential global nav or margin
            newCrumbsDiv.style.width = 'calc(100% - 100px)'; // Adjust width considering left offset
            newCrumbsDiv.style.height = '100%';
            newCrumbsDiv.style.padding = '0 15px';
            newCrumbsDiv.style.backgroundColor = 'transparent';
            newCrumbsDiv.style.opacity = '0';
            newCrumbsDiv.style.transition = 'opacity 0.5s ease 0.2s';
            newCrumbsDiv.style.display = 'flex';
            newCrumbsDiv.style.alignItems = 'center';
            newCrumbsDiv.style.overflow = 'hidden';
            newCrumbsDiv.style.boxSizing = 'border-box';

            const courseList = document.createElement('ul');
            courseList.style.display = 'flex';
            courseList.style.listStyle = 'none';
            courseList.style.padding = '0';
            courseList.style.margin = '0';
            courseList.style.overflowX = 'auto';
            courseList.style.whiteSpace = 'nowrap';
            courseList.style.height = '100%';
            courseList.style.alignItems = 'center';

            courseRows.forEach(row => {
                const favoriteCourse = row.querySelector('span.course-list-favorite-course.course-list-favoritable');
                const courseLinkElement = row.querySelector('.course-list-course-title-column a');

                if (favoriteCourse && courseLinkElement) {
                    const courseIdMatch = courseLinkElement.href.match(/courses\/(\d+)/);
                    if (!courseIdMatch) return;
                    const courseId = courseIdMatch[1];
                    const courseTitle = favoriteCourse.getAttribute('data-course-name') || courseLinkElement.textContent.trim();
                    const courseModulesLink = `/courses/${courseId}/modules`;

                    const listItem = document.createElement('li');
                    listItem.style.marginRight = '20px';
                    listItem.style.display = 'flex';
                    listItem.style.alignItems = 'center';

                    const listLink = document.createElement('a');
                    listLink.href = courseModulesLink;
                    listLink.textContent = courseTitle;
                    listLink.title = courseTitle;
                    listLink.style.textDecoration = 'none';
                    listLink.style.color = '#007BFF'; // Standard blue for links in course bar
                    listLink.style.display = 'block';
                    listLink.style.maxWidth = '180px';
                    listLink.style.overflow = 'hidden';
                    listLink.style.textOverflow = 'ellipsis';
                    listLink.style.whiteSpace = 'nowrap';

                    listLink.addEventListener('mouseover', () => listLink.style.textDecoration = 'underline');
                    listLink.addEventListener('mouseout', () => listLink.style.textDecoration = 'none');

                    listItem.appendChild(listLink);
                    courseList.appendChild(listItem);
                }
            });

            // --- Lege staat (Add courses) ---
            if (courseList.children.length === 0) {
                const listItem = document.createElement('li');
                listItem.style.marginRight = '20px';
                listItem.style.display = 'flex';
                listItem.style.alignItems = 'center';

                const listLink = document.createElement('a');
                listLink.href = 'javascript:void(0)'; // Voorkom standaard navigatie
                listLink.textContent = 'Add courses';
                listLink.title = 'Add courses';
                listLink.style.textDecoration = 'none';
                listLink.style.color = '#007BFF'; // Zelfde blauw als de cursus links
                listLink.style.display = 'block';
                listLink.style.maxWidth = '180px';
                listLink.style.overflow = 'hidden';
                listLink.style.textOverflow = 'ellipsis';
                listLink.style.whiteSpace = 'nowrap';
                listLink.style.cursor = 'pointer';

                listLink.addEventListener('mouseover', () => listLink.style.textDecoration = 'underline');
                listLink.addEventListener('mouseout', () => listLink.style.textDecoration = 'none');
                
                // Open de tutorial bij klikken
                listLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL) {
                        window.open(chrome.runtime.getURL('tutorial.html'), '_blank');
                    } else {
                        console.warn("Extension runtime not available, cannot open tutorial.");
                        // Fallback indien nodig
                        window.open('https://canvas.uva.nl/courses', '_blank');
                    }
                });

                listItem.appendChild(listLink);
                courseList.appendChild(listItem);
            }

            newCrumbsDiv.appendChild(courseList);
            barContainer.appendChild(newCrumbsDiv);
            document.body.appendChild(barContainer);

            requestAnimationFrame(() => { // Ensure element is in DOM for transition
                requestAnimationFrame(() => { // Next frame to trigger opacity transition
                    newCrumbsDiv.style.opacity = '1';
                });
            });
        })
        .catch(error => {
            console.error('Custom Script: Problem fetching or processing /courses/ page:', error);
        });

    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        if (!barContainer) return;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 50) { // Scrolled down and past a threshold
            barContainer.style.top = `-${barContainer.offsetHeight}px`;
        } else if (scrollTop < lastScrollTop || scrollTop <= 5) { // Scrolled up or at the top
            barContainer.style.top = '0';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, false);

    const currentPathCourseIdMatch = window.location.pathname.match(/\/courses\/(\d+)/);
    if (currentPathCourseIdMatch && currentPathCourseIdMatch[1]) {
        const currentCourseId = currentPathCourseIdMatch[1];
        fetch(`/courses/${currentCourseId}/modules`)
            .then(response => {
                if (response.ok) return response.text();
                throw new Error(`Network response was not ok for /courses/${currentCourseId}/modules.`);
            })
            .then(htmlText => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = htmlText;
                
                let moduleStates = {};
                if (chrome && chrome.storage && chrome.storage.local) {
                     chrome.storage.local.get(['moduleStates'], function(storageResult) {
                        moduleStates = (storageResult && storageResult.moduleStates) ? storageResult.moduleStates : {};
                        populateSidebarModules(tempDiv, currentCourseId, moduleStates);
                    });
                } else {
                    // Fallback if chrome.storage.local is not available
                    populateSidebarModules(tempDiv, currentCourseId, moduleStates);
                }


            })
            .catch(error => {
                console.error('Custom Script: Error fetching or processing modules:', error);
            });
    } else {
        console.log("Custom Script: Not on a specific course page, or course ID not found in URL. Sidebar will not populate modules.");
    }

    function populateSidebarModules(tempDiv, currentCourseId, moduleStates) {
        const headers = tempDiv.querySelectorAll('div.ig-header');
        headers.forEach(header => {
            const titleElementInHeader = header.querySelector('span.name');
            if (!titleElementInHeader) return;
            const title = titleElementInHeader.innerText.trim();
            if (!title) return;

            const headerContainer = document.createElement('div');
            // --- Vierkant / Box Styling ---
            headerContainer.style.marginBottom = '20px';
            headerContainer.style.border = `1px solid ${sidebarStaticColors.borderColor}`;
            headerContainer.style.borderRadius = '6px';
            headerContainer.style.overflow = 'hidden'; // Ensure rounded corners work with child elements
            headerContainer.style.backgroundColor = sidebarStaticColors.background;

            const titleElement = document.createElement('h3');
            
            titleElement.classList.add('module-header-title');
            titleElement.style.cursor = 'pointer';
            titleElement.style.display = 'flex'; // Zodat icoon en tekst naast elkaar staan
            titleElement.style.alignItems = 'center';
            
            // --- Titel strak in de box ---
            titleElement.style.marginTop = '0'; 
            titleElement.style.marginBottom = '0'; 
            
            // --- Grijze Titel Styles & Border Bottom ---
            titleElement.style.fontWeight = '600';
            titleElement.style.fontSize = '1.2rem';
            titleElement.style.padding = '12px 15px'; 
            titleElement.style.borderRadius = '0px';
            titleElement.style.borderBottom = `1px solid ${sidebarStaticColors.borderColor}`; // Separatie lijn
            
            // Kleuren terug naar grijs
            titleElement.style.backgroundColor = sidebarStaticColors.moduleHeaderBackground;
            titleElement.style.color = sidebarStaticColors.moduleHeaderText;
            
            // Hover effect herstellen
            titleElement.onmouseover = () => titleElement.style.backgroundColor = sidebarStaticColors.moduleHeaderHoverBackground;
            titleElement.onmouseout = () => titleElement.style.backgroundColor = sidebarStaticColors.moduleHeaderBackground;
            
            // Maak het pijltje (chevron)
            const arrowIcon = document.createElement('i');
            arrowIcon.innerHTML = '&#9654;'; // Driehoekje naar rechts
            arrowIcon.style.marginRight = '8px';
            arrowIcon.style.fontSize = '12px'; 
            arrowIcon.style.transition = 'transform 0.2s ease'; // Animatie voor draaien
            arrowIcon.style.display = 'inline-block';
            arrowIcon.style.verticalAlign = 'middle'; 
            arrowIcon.style.transformOrigin = 'center'; 
            arrowIcon.style.fontStyle = 'normal'; // AANGEPAST: Fix voor scheve weergave
            
            // De tekst span
            const textSpan = document.createElement('span');
            textSpan.classList.add('name');
            textSpan.textContent = title;
            textSpan.style.verticalAlign = 'middle';
            
            // Voeg ze samen
            titleElement.appendChild(arrowIcon);
            titleElement.appendChild(textSpan);

            headerContainer.appendChild(titleElement);

            const moduleItemsContainer = document.createElement('div');
            const moduleKey = `module_${currentCourseId}_${title.replace(/\s+/g, '_')}`;
            
            // AANGEPAST: Standaard open (true) tenzij specifiek 'false' in storage
            // Nu expliciet controleren of het 'undefined' is, en dan op true zetten.
            let isOpen = true;
            if (moduleStates[moduleKey] !== undefined) {
                isOpen = moduleStates[moduleKey];
            } else {
                moduleStates[moduleKey] = true;
            }
            
            // Animatie styles voor smooth reveal
            moduleItemsContainer.style.overflow = 'hidden';
            moduleItemsContainer.style.transition = 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out';
            
            // Initiele state op basis van isOpen
            if (isOpen) {
                moduleItemsContainer.style.display = 'block';
                // Zet direct een hoge max-height zodat het zichtbaar is bij laden
                // We passen dit later aan naar 'none' of de echte hoogte
                moduleItemsContainer.style.maxHeight = '5000px'; 
                moduleItemsContainer.style.opacity = '1';
            } else {
                moduleItemsContainer.style.display = 'none'; 
                moduleItemsContainer.style.maxHeight = '0px';
                moduleItemsContainer.style.opacity = '0';
            }
            
            // Zet de juiste rotatie van het pijltje bij start
            if (isOpen) {
                arrowIcon.style.transform = 'rotate(90deg)'; // Pijltje naar beneden
            } else {
                arrowIcon.style.transform = 'rotate(0deg)'; // Pijltje naar rechts
            }

            // --- Indentatie ---
            // moduleItemsContainer.style.marginLeft = '10px';
            // moduleItemsContainer.style.paddingLeft = '5px';

            let currentSubheaderDiv = null;
            const moduleItemsOriginal = header.nextElementSibling?.querySelectorAll('.context_module_item') || [];

            moduleItemsOriginal.forEach(item => {
                const moduleItemTitleElementOriginal = item.querySelector('.module-item-title .item_name');
                if (!moduleItemTitleElementOriginal) return;

                const isSubheader = item.classList.contains('context_module_sub_header');

                if (isSubheader) {
                    currentSubheaderDiv = document.createElement('div');
                    currentSubheaderDiv.classList.add('subheader-text');
                    const subheaderTitleOriginal = moduleItemTitleElementOriginal.textContent.trim();
                    const cleanedTitle = subheaderTitleOriginal.replace(/\s*\d+\s*$/, '');
                    currentSubheaderDiv.innerHTML = `<strong><span style="padding: 1px 6px 10px 3px; display: inline-block;">${cleanedTitle}</span></strong>`;
                    currentSubheaderDiv.style.marginTop = '12px';
                    currentSubheaderDiv.style.marginBottom = '6px';
                    currentSubheaderDiv.style.paddingLeft = '5px';
                    currentSubheaderDiv.style.fontWeight = '500';
                    currentSubheaderDiv.style.color = sidebarStaticColors.text; // Subheader text color
                    moduleItemsContainer.appendChild(currentSubheaderDiv);
                } else {
                    const moduleLinkOriginal = moduleItemTitleElementOriginal.querySelector('a');
                    if (!moduleLinkOriginal) return;

                    const moduleTitle = moduleLinkOriginal.textContent.trim();
                    const moduleUrl = moduleLinkOriginal.href;
                    const moduleItemId = getModuleItemId(moduleUrl);

                    const moduleItemDiv = document.createElement('div');
                    moduleItemDiv.classList.add('module-item-entry');
                    
                    // --- Streepjes (Separatie) ---
                    moduleItemDiv.style.padding = '0';
                    moduleItemDiv.style.borderBottom = `0.5px solid ${sidebarStaticColors.borderColor}`;
                    
                    const clonedLink = document.createElement('a');
                    clonedLink.href = moduleUrl;
                    clonedLink.classList.add('module-link');
                    if (moduleItemId && window.location.href.includes(moduleItemId)) {
                        clonedLink.classList.add('module-link-active');
                        clonedLink.style.backgroundColor = sidebarStaticColors.moduleLinkActiveBackground;
                        clonedLink.style.color = sidebarStaticColors.moduleLinkActiveText;
                    } else {
                        clonedLink.style.color = sidebarStaticColors.moduleLinkText;
                        clonedLink.style.fontWeight = 'bold';
                        clonedLink.style.backgroundColor = 'transparent';
                    }
                    
                    clonedLink.style.padding = '10px 12px'; 
                    clonedLink.style.width = '100%';
                    clonedLink.style.display = 'flex';
                    clonedLink.style.alignItems = 'center';
                    clonedLink.style.textDecoration = 'none';
                    clonedLink.style.borderRadius = '4px';
                    // Transition for hover is handled by CSS, but background could transition if set.
                    clonedLink.style.transition = 'background-color 0.15s ease';
                    clonedLink.style.position = 'relative';
                    clonedLink.style.zIndex = '1'; // Fix voor highlight zichtbaarheid
                    clonedLink.style.boxSizing = 'border-box';

                    const textSpan = document.createElement('span');
                    textSpan.innerText = moduleTitle;
                    textSpan.style.flex = '1';
                    textSpan.style.overflowWrap = 'break-word';
                    textSpan.style.wordBreak = 'break-word'; // Ensure long words wrap

                    const iconContainerOriginal = item.querySelector('.ig-type-icon');
                    let selectedIconClone = null;
                                        
                    if (iconContainerOriginal) {
                        // Select all possible icon types
                        const allIcons = iconContainerOriginal.querySelectorAll('i, svg, img, .fontello-icon, .material-icons, [class*="icon-"]');
                        let iconOriginal = null;

                        // Iterate to find the single visible icon
                        const row = iconContainerOriginal.closest('li.context_module_item');
                        if (row) {
                            if (row.classList.contains('assignment')) {
                                iconOriginal = iconContainerOriginal.querySelector('.icon-assignment');
                                
                            } else if (row.classList.contains('quiz')) {
                                iconOriginal = iconContainerOriginal.querySelector('.icon-quiz');
                            } else if (row.classList.contains('discussion_topic')) {
                                iconOriginal = iconContainerOriginal.querySelector('.icon-discussion');
                            } else if (row.classList.contains('attachment')) {
                                iconOriginal = iconContainerOriginal.querySelector('.icon-paperclip');
                            } else if (row.classList.contains('external_url') || row.classList.contains('context_external_tool')) {
                                iconOriginal = iconContainerOriginal.querySelector('.icon-link');
                            } else if (row.classList.contains('wiki_page')) {
                                iconOriginal = iconContainerOriginal.querySelector('.icon-document');
                            }
                        }

                        if (iconOriginal) {
                            selectedIconClone = iconOriginal.cloneNode(true);

                            // Standard styling
                            selectedIconClone.style.marginRight = '10px';
                            selectedIconClone.style.width = '16px';
                            selectedIconClone.style.height = '16px';
                            selectedIconClone.style.flexShrink = '0';

                            // Only apply text color if it's a font-icon (<i>), not an image (<img>)
                            if (iconOriginal.tagName.toLowerCase() !== 'img') {
                                selectedIconClone.style.color = sidebarStaticColors.iconColor;
                            }

                            if (selectedIconClone.classList) {
                                selectedIconClone.classList.remove('tooltip'); 
                            }
                        }
                    }
                                        
                    if (!selectedIconClone) { // Fallback icon
                        selectedIconClone = document.createElement('span');
                        selectedIconClone.innerHTML = '&#8226;'; // Bullet point
                        selectedIconClone.style.marginRight = '10px';
                        selectedIconClone.style.display = 'inline-block';
                        selectedIconClone.style.width = '16px';
                        selectedIconClone.style.height = '16px';
                        selectedIconClone.style.textAlign = 'center';
                        //selectedIconClone.style.color = sidebarStaticColors.iconColor;
                    }
                                        
                    // Check if the parent link is active and update icon color accordingly
                    if (clonedLink.classList.contains('module-link-active')) {
                        selectedIconClone.style.color = sidebarStaticColors.activeIconColor;
                    } else {
                        selectedIconClone.style.color = sidebarStaticColors.iconColor;
                    }

                    if (selectedIconClone) {
                        clonedLink.appendChild(selectedIconClone);
                    }
                    clonedLink.appendChild(textSpan);
                    moduleItemDiv.appendChild(clonedLink);

                    if (currentSubheaderDiv) {
                        currentSubheaderDiv.appendChild(moduleItemDiv);
                    } else {
                        moduleItemsContainer.appendChild(moduleItemDiv);
                    }
                                        
                }
            });

            // Set precise height for smooth animation after population
            if (isOpen) {
               // Wait for DOM update
               setTimeout(() => {
                   // Als het al open is, zorg dat de max-height op de echte hoogte komt
                   // of 'none' om flexibel te zijn voor dynamische content
                   moduleItemsContainer.style.maxHeight = 'none'; 
               }, 0);
            }

            titleElement.addEventListener('click', () => {
                const isCurrentlyOpen = moduleItemsContainer.style.opacity === '1';
                
                if (isCurrentlyOpen) {
                    // Close animation: set height specifically first, then to 0
                    moduleItemsContainer.style.maxHeight = moduleItemsContainer.scrollHeight + "px";
                    
                    // Force reflow
                    void moduleItemsContainer.offsetWidth; 

                    moduleItemsContainer.style.maxHeight = '0px';
                    moduleItemsContainer.style.opacity = '0';
                    arrowIcon.style.transform = 'rotate(0deg)';
                    
                    setTimeout(() => {
                        if(moduleItemsContainer.style.opacity === '0') {
                             moduleItemsContainer.style.display = 'none';
                        }
                    }, 300); 
                    
                    moduleStates[moduleKey] = false;
                } else {
                    // Open animation
                    moduleItemsContainer.style.display = 'block';
                    
                    requestAnimationFrame(() => {
                        moduleItemsContainer.style.maxHeight = moduleItemsContainer.scrollHeight + "px";
                        moduleItemsContainer.style.opacity = '1';
                        arrowIcon.style.transform = 'rotate(90deg)';
                        
                        // After transition, remove max-height so content can expand if needed (e.g. dynamic content)
                        setTimeout(() => {
                             if(moduleItemsContainer.style.opacity === '1') {
                                 moduleItemsContainer.style.maxHeight = 'none';
                             }
                        }, 300);
                    });
                    
                    moduleStates[moduleKey] = true;
                }
                
                if (chrome && chrome.storage && chrome.storage.local) {
                    chrome.storage.local.set({ 'moduleStates': moduleStates });
                }
            });

            headerContainer.appendChild(moduleItemsContainer);
            newSidebar.appendChild(headerContainer);
        });
        // Initial save of module states if chrome.storage.local is available and some modules defaulted to open
        if (chrome && chrome.storage && chrome.storage.local) {
             chrome.storage.local.set({ 'moduleStates': moduleStates });
        }
    }


    document.body.appendChild(newSidebarContainer);

    // Inject CSS for blue hover effect on module links
    const hoverStyle = document.createElement('style');
    hoverStyle.innerHTML = `
    #custom-sidebar a.module-link::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(217, 235, 255, 0.6); /* Lichtblauw transparent */
        border-radius: 0;
        z-index: -1;
        opacity: 0;
        transition: opacity 0s ease;
    }
    #custom-sidebar a.module-link:hover::before {
        opacity: 1;
    }
    `;
    
    document.head.appendChild(hoverStyle);

    console.log("Custom Script: Fully initialized and new sidebar appended.");
});