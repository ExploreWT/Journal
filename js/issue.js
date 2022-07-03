// Accordion (for search block issues page)
function openSection(evt, keyName) {
    var tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(keyName).style.display = "block";
    evt.currentTarget.className += " active";
}

// To hide or show search block issues page
document.getElementById('explore').onclick = function() {
    if (document.getElementById('searchblock').style.display === 'none') {
        document.getElementById('searchblock').style.display = "block";
    } else {
        document.getElementById('searchblock').style.display = "none";
    }
}

document.getElementById('close-icon').onclick = function() {
    document.getElementById('searchblock').style.display = "none";
}

// Metadata part
// Retrieves value from attribute "content" of an element, otherwise inner text of the element
function getElementContent(element) {
    const content = element.getAttribute("content"); 
    if (content) {
        return content;
    } else {
        return element.innerText;
    }
}

// Creates JS object where keys are { people: {}, organizations: {}, keyWords: {}, citations: {} }. 
// Each value of the keys are objects where keys are content of elements with appropriate class ('person', 'organization', 'keyWord', 'citation') and values are arrays of the elements with the same content.
function getMentions(article_id) {
    const article = document.getElementById(article_id);
    const result = {people: {}, organizations: {}, keyWords: {}, citations: {} };
    const peopleElements = article.getElementsByClassName('person');
    const organizationsElements = article.getElementsByClassName('organization');
    const keyWordsElements = article.getElementsByClassName('keyWord');
    const citationElements = article.getElementsByClassName('citation');

    for (let i = 0; i < peopleElements.length; i++) {
        const personName = getElementContent(peopleElements[i]);
        if (result.people[personName]) {
            result.people[personName].push(peopleElements[i]);
        } else {
            result.people[personName] = [peopleElements[i]];
        }
    }

    for (let i = 0; i < organizationsElements.length; i++) {
        const organizationName = getElementContent(organizationsElements[i]);
        if (result.organizations[organizationName]) {
            result.organizations[organizationName].push(organizationsElements[i]);
        } else {
            result.organizations[organizationName] = [organizationsElements[i]];
        }
    }

    for (let i = 0; i < keyWordsElements.length; i++) {
        const keyWord = getElementContent(keyWordsElements[i]);
        if (result.keyWords[keyWord]) {
            result.keyWords[keyWord].push(keyWordsElements[i]);
        } else {
            result.keyWords[keyWord] = [keyWordsElements[i]];
        }
    }

    if (citationElements.length > 0) {
        result.citations['Tick to highlight all citations in the text'] = citationElements;
    }

    return result;
}


// Function used to create an element in Statistics section of metadata viewer 
let searchItem = {
    name: '',
    currentItem: 0
}

function createStatisticElement(metaData, subject, objectName) {
    const element = document.createElement("div");
    element.className = "statistic-element"
    element.innerText = objectName + ": " + metaData[subject][objectName].length;
    element.onclick = function() {
        if (searchItem.name === objectName) {
            //Clear focus on current element
            metaData[subject][objectName][searchItem.currentItem].classList.remove('focus')

            // Checking if we are focused right now on the last element, otherwise increase value
            if (searchItem.currentItem + 1 === metaData[subject][objectName].length) {
                window.alert('You reached the last mention of the item.');
            } else {
                searchItem.currentItem += 1;
            }
        } else {
            const activeElement = document.getElementsByClassName('focus');

            if(activeElement[0]) {
                activeElement[0].classList.remove('focus');
            }

            // Set search item as current object
            searchItem = {
                name: objectName,
                currentItem: 0
            };
        }

        // Set classes focus and active, than scroll to element
        metaData[subject][objectName][searchItem.currentItem].classList.add('focus');
        metaData[subject][objectName][searchItem.currentItem].scrollIntoView({ block: 'nearest'});
    }

    return element
}

// Function used to create an element in sections people, institutions, key words of metadata viewer 
const highlightedElements = {
    article1: [],
    article2: [],
    article3: [],
}

function createSectionElement(metaData, articleNumber, subject, objectName) {
    const element = document.createElement("div");
    element.className = "section-element"

    const checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.id = objectName;
    checkbox.onchange = function(event) { 
        const maxHighlightNumber = 14;
        const highlightedArticleElements = highlightedElements['article' + articleNumber];

        const nonEmptyValues = highlightedArticleElements.filter(function(element) { return element !== undefined })
        if (nonEmptyValues.length === maxHighlightNumber && !highlightedArticleElements.includes(objectName)) {
            window.alert('There are to many highlighted items, please, remove some to continue.');
            checkbox.checked = false;
            return; 
        }

        if (highlightedArticleElements.includes(objectName)) {
            // getting current position in array and after that set value as empty
            const currentIndex = highlightedArticleElements.indexOf(objectName);
            highlightedArticleElements[currentIndex] = undefined;

            // For each element remove class highlight-{currentPositionInArray}
            for (let i = 0; i < metaData[subject][objectName].length; i++) {
                metaData[subject][objectName][i].classList.remove('highlight-' + (currentIndex + 1));
            }

        } else {
            // Trying to find undefined place in array. If it is exist, we fill it.
            // Otherwise push our value in the end of array
            let elementIndex = highlightedArticleElements.indexOf(undefined); 
            if (elementIndex >= 0) {
                highlightedArticleElements[elementIndex] = objectName;
                elementIndex += 1; 
            } else {
                highlightedArticleElements.push(objectName);
                elementIndex = highlightedArticleElements.length
            }

            // For each element add class highlight-{currentPositionInArray}
            for (let i = 0; i < metaData[subject][objectName].length; i++) {

                metaData[subject][objectName][i].classList.add('highlight-' + elementIndex)
            }
        }
    }

    const label = document.createElement("label");
    label.innerText = objectName;   
    label.htmlFor = objectName;

    element.appendChild(checkbox);
    element.appendChild(label);

    return element
}

function build(metaData, articleNumber) {
    const personNames = Object.keys(metaData.people);
    const organizations = Object.keys(metaData.organizations);
    const keyWords = Object.keys(metaData.keyWords);
    const citations = Object.keys(metaData.citations);

    const peopleSection = document.getElementById("Article" + articleNumber + "People");
    const organizationsSection = document.getElementById("Article" + articleNumber + "Organizations");
    const keyWordsSection = document.getElementById("Article" + articleNumber + "KeyWords");
    const citationsSection = document.getElementById("Article" + articleNumber + "Citations");
    const statisticsSection = document.getElementById("Article" + articleNumber + "Statistics");

    if (personNames.length > 0) {
        const header = document.createElement("h5");
        header.innerHTML = "People";
        statisticsSection.appendChild(header);
    }
    for (let i = 0; i < personNames.length; i++) {
        const sectionElement = createSectionElement(metaData, articleNumber, 'people', personNames[i]);
        peopleSection.appendChild(sectionElement);

        const statisticElement = createStatisticElement(metaData, 'people', personNames[i]);
        statisticsSection.appendChild(statisticElement);
    }

    if (organizations.length > 0) {
        const header = document.createElement("h5");
        header.innerHTML = "Institutions";
        statisticsSection.appendChild(header);
    }
    for (let i = 0; i < organizations.length; i++) {
        const sectionElement = createSectionElement(metaData, articleNumber, 'organizations', organizations[i]);
        organizationsSection.appendChild(sectionElement);

        const statisticElement = createStatisticElement(metaData, 'organizations', organizations[i])
        statisticsSection.appendChild(statisticElement);
    }


    if (keyWords.length > 0) {
        const header = document.createElement("h5");
        header.innerHTML = "Key words";
        statisticsSection.appendChild(header);
    }
    for (let i = 0; i < keyWords.length; i++) {
        const sectionElement = createSectionElement(metaData, articleNumber, 'keyWords', keyWords[i]);
        keyWordsSection.appendChild(sectionElement);

        const statisticElement = createStatisticElement(metaData, 'keyWords', keyWords[i])
        statisticsSection.appendChild(statisticElement);
    }

    for (let i = 0; i < citations.length; i++) {
        const sectionElement = createSectionElement(metaData, articleNumber, 'citations', citations[i]);
        citationsSection.appendChild(sectionElement);
    }
}


function main() {
    const article1MetaData = getMentions('article_1');
    const article2MetaData = getMentions('article_2');
    const article3MetaData = getMentions('article_3');

    build(article1MetaData, 1);
    build(article2MetaData, 2);
    build(article3MetaData, 3);
}

main()


