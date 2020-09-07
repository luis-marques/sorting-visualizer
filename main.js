/*
Selection Sort
- Insertion Sort
- Quick Sort
Merge Sort
Heap Sort
Radix Sort
Shell Sort
- Bubble Sort
Cocktail Shaker Sort
Gnome Sort
Bitonic Sort
Bogo Sort

Put total time it took to sort the elements
(BONUS: number of comparisons and number of array accesses)
could show the value milissecond delay added to the visualization

Tried doing single coordinate for buttons do rectangle instead

Need to find a better way to determine when the sorting has ended!!!!

Could add legend on the bottom explaining what the colors are
 */


var barSize = [];
var numberOfBars;

var backgroundColor = 230;

// Menu Colors
var menuTextColor = 220;
var menuColor = [2,20,68]
var menuDetailColorOffset = 30;

var initialNumberBars = 40
var msDelay = 100;

var sorting = false;
let sortingType = "not defined";

var barColor = [];

var buttons = {"bubble sort": "not pressed", "quick sort": "not pressed", "sort button": "not pressed",
    "insertion sort": "not pressed", "selection sort": "not pressed"};

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);

    // Initializes number of bars and their size
    numberOfBars = initialNumberBars;
    for (i = 0; i < numberOfBars; i++){
        barSize[i] = random(20, windowHeight*0.8);
        barColor[i] = "default";
    }

    // Slider
    slider = createSlider(4, 100, initialNumberBars, 1); // min, max, default, step
    slider.position(windowWidth*0.1,windowHeight*0.035);

}


async function draw(){
    background(backgroundColor);


    // when slider changes value calls the updateNumberBars() function
    slider.changed(updateNumberBars)
    slider.position(windowWidth*0.02, windowHeight*0.015);
    slider.size(windowWidth*0.1,windowHeight*0.035);

    // calculates width of Bar Canvas
    widthBarCanvas = windowWidth*0.9 - windowWidth*0.1

    // calculates width of each bar to keep the above constant
    barWidth = widthBarCanvas/numberOfBars;



    drawBars();

    // Menu Bar
    noStroke();
    fill(menuColor);
    rect(0,0, windowWidth,windowHeight*0.1,);

    if (sorting==false) {
        // Slider Text
        fill(menuTextColor);
        noStroke();
        textAlign(CENTER);
        textSize(windowHeight * 0.04);
        text("# of bars: " + slider.value(), windowWidth * 0.02 + windowWidth * 0.1 / 2, windowHeight * 0.08);
    }
    fill(menuColor[0]+menuDetailColorOffset,menuColor[1]+menuDetailColorOffset,menuColor[2]+menuDetailColorOffset);
    rect(windowWidth*0.04 + windowWidth*0.1,0, 8,windowHeight*0.1,);

    if (sorting==false) {
        // Sort button
        if (buttons["sort button"]=="not pressed") {
            fill(menuTextColor);
        }
        else{
            fill(255,0,0);
        }
        noStroke();
        textAlign(CENTER);
        textSize(windowHeight * 0.04);
        text("Sort!", windowWidth * 0.9, windowHeight * 0.065);
    }

    drawSortNames();
    drawSortRectangles();
    overButtons();

    rectMode(CORNER);
    if (sorting){
        fill(255, 0, 0);
        noStroke();
        textAlign(CENTER);
        textSize(windowHeight*0.04);
        text("Sorting...", windowWidth*0.9, windowHeight*0.065);

        slider.hide();

        if (sortingType == "bubble sort"){
            BubbleSort(barSize);
            restorePickingSorter();
        }
        else if(sortingType == "quick sort"){
            QuickSort(barSize, 0, numberOfBars-1);
            restorePickingSorter();
        }
        else if(sortingType == "insertion sort"){
            InsertionSort(barSize);
            restorePickingSorter();
        }
        else if(sortingType == "selection sort"){
            SelectionSort(barSize);
            restorePickingSorter();
        }
    }
}

function restorePickingSorter(){
    sorting = false;
    slider.show();
}

function drawSortNames(){
    noStroke();
    textAlign(CENTER);
    textSize(windowHeight*0.03);


    // Bubble Sort
    fill(255,0,0)
    if (buttons["bubble sort"]=="not pressed") {
        fill(menuTextColor);
    }
    if(sortingType=="bubble sort"){
        fill(255, 73, 73);
    }
    text("Bubble Sort", windowWidth*0.2, windowHeight*0.04);

    // Quick Sort
    fill(255,0,0);
    if (buttons["quick sort"]=="not pressed") {
        fill(menuTextColor);
    }
    if(sortingType=="quick sort"){
        fill(255, 73, 73);
    }
    text("Quick Sort", windowWidth*0.2, windowHeight*0.08);

    // Insertion Sort
    fill(255,0,0);
    if (buttons["insertion sort"]=="not pressed") {
        fill(menuTextColor);
    }
    if(sortingType=="insertion sort"){
        fill(255, 73, 73);
    }
    text("Insertion Sort", windowWidth*0.3, windowHeight*0.04);

    // Merge Sort
    fill(menuTextColor);
    text("Merge Sort", windowWidth*0.3, windowHeight*0.08);

    // Selection Sort
    fill(255,0,0);
    if (buttons["selection sort"]=="not pressed") {
        fill(menuTextColor);
    }
    if(sortingType=="selection sort"){
        fill(255, 73, 73);
    }
    text("Selection Sort", windowWidth*0.4, windowHeight*0.04);

    // Heap Sort
    fill(menuTextColor);
    text("Heap Sort", windowWidth*0.4, windowHeight*0.08);
}

function drawSortRectangles(){
    fill(255,0,0,0);
    noStroke();
    rectMode(CENTER);

    bubbleRect = rect(windowWidth*0.2, windowHeight*0.03, windowHeight*0.16, windowHeight*0.03);
    quickRect = rect(windowWidth*0.2, windowHeight*0.07, windowHeight*0.14, windowHeight*0.03);
    insertionRect = rect(windowWidth*0.3, windowHeight*0.03, windowHeight*0.18, windowHeight*0.03);
    selectionRect = rect(windowWidth*0.4, windowHeight*0.03, windowHeight*0.19, windowHeight*0.03);

    sortRect = rect(windowWidth*0.9, windowHeight*0.05, windowHeight*0.085, windowHeight*0.04);

}

function overButtons(){
    if ((mouseX > windowWidth*0.2 - windowHeight*0.16/2) && mouseX < (windowWidth*0.2+windowHeight*0.16/2) && (mouseY > windowHeight*0.03-windowHeight*0.03/2) && mouseY < (windowHeight*0.03 + windowHeight*0.03/2)){
        buttons["bubble sort"] = "pressed";
    }
    else{
        buttons["bubble sort"] = "not pressed";
    }

    if ((mouseX > windowWidth*0.2 - windowHeight*0.14/2) && mouseX < (windowWidth*0.2+windowHeight*0.14/2) && (mouseY > windowHeight*0.07-windowHeight*0.03/2) && mouseY < (windowHeight*0.07 + windowHeight*0.03/2)){
        buttons["quick sort"] = "pressed";
    }
    else{
        buttons["quick sort"] = "not pressed";
    }

    if ((mouseX > windowWidth*0.9 - windowHeight*0.085/2) && mouseX < (windowWidth*0.9+windowHeight*0.085/2) && (mouseY > windowHeight*0.05-windowHeight*0.04/2) && mouseY < (windowHeight*0.05 + windowHeight*0.04/2)){
        buttons["sort button"] = "pressed";
    }
    else{
        buttons["sort button"] = "not pressed";
    }

    if ((mouseX > windowWidth*0.3 - windowHeight*0.18/2) && mouseX < (windowWidth*0.3+windowHeight*0.18/2) && (mouseY > windowHeight*0.03-windowHeight*0.03/2) && mouseY < (windowHeight*0.03 + windowHeight*0.03/2)){
        buttons["insertion sort"] = "pressed";
    }
    else{
        buttons["insertion sort"] = "not pressed";
    }

    if ((mouseX > windowWidth*0.4 - windowHeight*0.19/2) && mouseX < (windowWidth*0.4+windowHeight*0.19/2) && (mouseY > windowHeight*0.03-windowHeight*0.03/2) && mouseY < (windowHeight*0.03 + windowHeight*0.03/2)){
        buttons["selection sort"] = "pressed";
    }
    else{
        buttons["selection sort"] = "not pressed";
    }
}

function mousePressed(){
    if (buttons["bubble sort"] == "pressed"){
        sortingType = "bubble sort";
    }

    if (buttons["quick sort"] == "pressed"){
        sortingType = "quick sort";
    }

    if (buttons["insertion sort"] == "pressed"){
        sortingType = "insertion sort";
    }
    if (buttons["selection sort"] == "pressed"){
        sortingType = "selection sort";
    }

    if (buttons["sort button"] == "pressed"){
        sorting = true;
    }
}

function drawBars(){
    for (let i=0; i<barSize.length; i++){
        if (barColor[i]=="default") {
            fill(0, 191, 255)
        }
        else if (barColor[i]=="pivot"){
            fill(255,0,0);
        }
        else if (barColor[i]=="partition"){
            fill(0,84,12);
        }
        stroke(backgroundColor);
        if (numberOfBars< 28){
            strokeWeight(barWidth*0.05);
        }
        else{
            strokeWeight(barWidth*0.1);
        }
        rect(width*0.1 + i*barWidth, windowHeight*0.1, barWidth, barSize[i]);

        if (numberOfBars<50){
            textAlign(CENTER);
            fill(255);
            noStroke();
            textSize(barWidth*0.4);
            text(round(barSize[i], 0), width*0.1 + i*barWidth + barWidth/2, windowHeight*0.1 + barWidth/2);
        }
    }
}

async function BubbleSort(array){
    for (i=0; i<array.length; i++){
        for (j=0; j<array.length-1-i;j++){
            barColor[j] = "pivot";
            barColor[j+1] = "partition";
            var a = array[j];
            var b = array[j+1];

            if (a>b){
                await ASYNCswap(array, j, j+1);
            }

            //await sleep(msDelay);
            barColor[j] = "default";
            barColor[j+1] = "default";
        }
    }
}

async function QuickSort(array, start, end){
    /*
     Lomuto partition scheme
    */

    // ends sorting
    if (start >= end){return;}

    let index = await partition(array, start, end);
    barColor[index] = "default";

    await Promise.all([
        QuickSort(array, start, index-1),
        QuickSort(array, index+1, end)
    ]);
}

async function partition(array, start, end){
    let pivotIndex = start;
    let pivotValue = array[end];

    for (let i = start; i<end; i++){
        barColor[i] = "partition";
    }

    barColor[pivotIndex] = "pivot";

    for (let i=start; i<end;i++){
        if (array[i] < pivotValue){
            await ASYNCswap(array, i, pivotIndex);
            barColor[pivotIndex] = "default"
            pivotIndex++;
            barColor[pivotIndex] = "pivot"
        }
    }

    await ASYNCswap(array, pivotIndex, end);

    for (let i = start; i<end; i++){
        if (i != pivotIndex) {
            barColor[i] = "default";
        }
    }

    return pivotIndex;
}

async function InsertionSort(array){
    for (i=1; i<array.length;i++){

        pivot = array[i];
        barColor[i] = "pivot";

        j = i-1;
        temp = j;
        barColor[j] = "partition";

        while (j >=0 && array[j] > pivot){
            await ASYNCswap(array, j+1, j);
            j -=1;
            barColor[j] = "partition";
            barColor[j+1] = "default";
        }
        barColor[j]="default"
        barColor[temp] = "default";
        barColor[i]="default";
    }
}

async function SelectionSort(array){

    for (i=0;i<array.length;i++){

        barColor[i] = "pivot";
        var minIndex = i;

        for (j=i+1;j<array.length;j++){
            barColor[j] = "partition";
            if (array[j] < array[minIndex]){
                minIndex = j;
            }
            await sleep(msDelay/2);
            barColor[j] = "default";
        }
        await ASYNCswap(array, minIndex, i);
        barColor[i] = "default";
    }


}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function swap(array, i, j){
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

async function ASYNCswap(array, i, j){
    await sleep(50);
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function updateNumberBars(){
    if(sorting==false) {
        barSize = [];
        barColor = []
        numberOfBars = slider.value();
        for (i = 0; i < numberOfBars; i++) {
            barSize[i] = random(20, windowHeight * 0.8);
            barColor[i] = "default";
        }
    }
}

``
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}