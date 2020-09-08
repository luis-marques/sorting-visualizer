/*
- Selection Sort
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

Sorting has ended when all bars are purple

Could add legend on the bottom explaining what the colors are

Heap visualization is kinda week gonna think about which parts are worth coloring
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
    "insertion sort": "not pressed", "selection sort": "not pressed", "bitonic sort": "not pressed",
    "heap sort": "not pressed", "counting sort": "not pressed", "merge sort": "not pressed"};

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);

    // Initializes number of bars and their size
    numberOfBars = initialNumberBars;
    for (i = 0; i < numberOfBars; i++){
        barSize[i] = round(random(20, windowHeight*0.8));
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
        else if(sortingType == "bitonic sort"){
            BitonicSort(barSize);
            restorePickingSorter();
        }
        else if(sortingType == "merge sort"){
            MergeSort(barSize);
            restorePickingSorter();
        }
        else if(sortingType == "heap sort"){
            HeapSort(barSize);
            restorePickingSorter();
        }
        else if(sortingType == "counting sort"){
            CountingSort(barSize);
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
    fill(255,0,0);
    if (buttons["merge sort"]=="not pressed") {
        fill(menuTextColor);
    }
    if(sortingType=="merge sort"){
        fill(255, 73, 73);
    }
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

    // Bitonic Sort
    fill(255,0,0);
    if (buttons["bitonic sort"]=="not pressed") {
        fill(menuTextColor);
    }
    if(sortingType=="bitonic sort"){
        fill(255, 73, 73);
    }
    text("Bitonic Sort", windowWidth*0.5, windowHeight*0.04);

    // Heap Sort
    fill(255,0,0);
    if (buttons["heap sort"]=="not pressed") {
        fill(menuTextColor);
    }
    if(sortingType=="heap sort"){
        fill(255, 73, 73);
    }
    text("Heap Sort", windowWidth*0.4, windowHeight*0.08);

    // Counting Sort
    fill(255,0,0);
    if (buttons["counting sort"]=="not pressed") {
        fill(menuTextColor);
    }
    if(sortingType=="counting sort"){
        fill(255, 73, 73);
    }
    text("Counting Sort", windowWidth*0.5, windowHeight*0.08);
}

function drawSortRectangles(){
    fill(255,0,0,0);
    noStroke();
    rectMode(CENTER);

    bubbleRect = rect(windowWidth*0.2, windowHeight*0.03, windowHeight*0.16, windowHeight*0.03);
    quickRect = rect(windowWidth*0.2, windowHeight*0.07, windowHeight*0.14, windowHeight*0.03);
    insertionRect = rect(windowWidth*0.3, windowHeight*0.03, windowHeight*0.18, windowHeight*0.03);
    selectionRect = rect(windowWidth*0.4, windowHeight*0.03, windowHeight*0.19, windowHeight*0.03);
    bitonicRect = rect(windowWidth*0.5, windowHeight*0.03, windowHeight*0.155, windowHeight*0.03);
    heapRect = rect(windowWidth*0.4, windowHeight*0.07, windowHeight*0.135, windowHeight*0.035);
    countingRect = rect(windowWidth*0.5, windowHeight*0.07, windowHeight*0.185, windowHeight*0.035);
    mergeRect = rect(windowWidth*0.3, windowHeight*0.07, windowHeight*0.15, windowHeight*0.035);

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
    if ((mouseX > windowWidth*0.5 - windowHeight*0.155/2) && mouseX < (windowWidth*0.5+windowHeight*0.155/2) && (mouseY > windowHeight*0.03-windowHeight*0.03/2) && mouseY < (windowHeight*0.03 + windowHeight*0.03/2)){
        buttons["bitonic sort"] = "pressed";
    }
    else{
        buttons["bitonic sort"] = "not pressed";
    }

    if ((mouseX > windowWidth*0.4 - windowHeight*0.135/2) && mouseX < (windowWidth*0.4+windowHeight*0.135/2) && (mouseY > windowHeight*0.07-windowHeight*0.035/2) && mouseY < (windowHeight*0.07 + windowHeight*0.035/2)){
        buttons["heap sort"] = "pressed";
    }
    else{
        buttons["heap sort"] = "not pressed";
    }

    if ((mouseX > windowWidth*0.5 - windowHeight*0.185/2) && mouseX < (windowWidth*0.5+windowHeight*0.185/2) && (mouseY > windowHeight*0.07-windowHeight*0.035/2) && mouseY < (windowHeight*0.07 + windowHeight*0.035/2)){
        buttons["counting sort"] = "pressed";
    }
    else{
        buttons["counting sort"] = "not pressed";
    }

    if ((mouseX > windowWidth*0.3 - windowHeight*0.15/2) && mouseX < (windowWidth*0.3+windowHeight*0.15/2) && (mouseY > windowHeight*0.07-windowHeight*0.035/2) && mouseY < (windowHeight*0.07 + windowHeight*0.035/2)){
        buttons["merge sort"] = "pressed";
    }
    else{
        buttons["merge sort"] = "not pressed";
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
    if (buttons["bitonic sort"] == "pressed"){
        sortingType = "bitonic sort";
    }
    if (buttons["heap sort"] == "pressed"){
        sortingType = "heap sort";
    }
    if (buttons["counting sort"] == "pressed"){
        sortingType = "counting sort";
    }
    if (buttons["merge sort"] == "pressed"){
        sortingType = "merge sort";
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
        else if (barColor[i]=="sorted"){
            fill(144,89,255);
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

            barColor[j] = "default";
            barColor[j+1] = "default";
        }
        barColor[array.length-i-1] = "sorted";
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
        barColor[i] = "sorted";
    }


}

function BitonicSort(array){
}

function MergeSort(array){

}



async function CountingSort(array){
    let maxValue = MaxValue(array);
    let minValue = MinValue(array);
    let counterSize = maxValue + 1;
    var counter = [];
    var sortedArray = [];

    // Initializing Counter
    for (let i=0; i<counterSize; i++){
        counter[i] = 0;
    }

    // Counting Elements
    for (let i=0; i<array.length; i++){
        counter[array[i]] += 1;
        barColor[i] = "pivot";
        await sleep(msDelay/2);
        barColor[i] = "default";
    }

    let j = 0;
    for (let i=minValue; i<=maxValue; i++){
        barColor[i] = "pivot";
        while(counter[i]>0){
            array[j] = i;
            barColor[j] = "pivot";
            j += 1;
            barColor[j] = "partition";
            await sleep(msDelay/4);
            barColor[j-1] = "default";
            barColor[j] = "default";
            counter[i] -= 1;
        }
        barColor[i] = "default";
    }
}

function MaxValue(array){
    let max = array[0];

    for (let i=1; i<array.length; i++){
        if (array[i] > max){
            max = array[i];
        }
    }
    return max;
}

function MinValue(array){
    let min = array[0];

    for (let i=1; i<array.length; i++){
        if (array[i] < min){
            min = array[i];
        }
    }
    return min;
}

async function HeapSort(array) {

    heap_size = array.length;

    await BuildMaxHeap(array);

    for (i = heap_size- 1; i > 0; i--) {
        barColor[i] = "sorted";
        await ASYNCswap(array, 0, i);
        heap_size--;
        await Heapify(array, 0);
    }
    await sleep(msDelay);
    barColor[0] = "sorted";
}

async function Heapify(array, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var largest = i;

    barColor[largest] = "pivot";

    if (left < heap_size && array[left] > array[largest]) {
        await sleep(msDelay/2);
        barColor[largest] = "default";
        largest = left;
        barColor[largest] = "partition";
    }
    if (right < heap_size && array[right] > array[largest])     {
        await sleep(msDelay/2);
        barColor[largest] = "default";
        largest = right;
        barColor[largest] = "partition";
    }

    if (largest != i) {
        await ASYNCswap(array, i, largest);
        await Heapify(array, largest);
    }
    barColor[largest] = "default";
}

async function BuildMaxHeap(array){
    for (let i = Math.floor(heap_size / 2); i >= 0; i -= 1)      {
        await Heapify(array, i);
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
            barSize[i] = round(random(20, windowHeight * 0.8));
            barColor[i] = "default";
        }
    }
}

``
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}