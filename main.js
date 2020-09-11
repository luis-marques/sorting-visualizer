/*
ADD MORE COMMENTS

CORRECT AMMOUNT OF ANIMATION DELAY PER ALGORITHM

eg merge sort is way too slow for most slider values

need to adjust the amount of delay per algo to make the animations speed for that algo reasonable
(ie 0 should be slow and 100 fast, currently merge is slow until like 80)

- Selection Sort (w sorted color)
- Insertion Sort (very questionable sorted color)
- Quick Sort (w sorted color)
- Merge Sort (w questionable sorted color)
- Heap Sort (w sorted color)
- Bubble Sort (w sorted color)
- Bitonic Sort (w questionable sorted color

Put total time it took to sort the elements
(BONUS: number of comparisons and number of array accesses)
could show the value milissecond delay added to the visualization

Could add legend on the bottom explaining what the colors are

Heap visualization is kinda week gonna think about which parts are worth coloring

 */


var barSize = [];
var numberOfBars;

var bitonicMsg;

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
var done;
var runningSort = false;

var buttons = {"bubble sort": "not pressed", "quick sort": "not pressed", "sort button": "not pressed",
    "insertion sort": "not pressed", "selection sort": "not pressed", "bitonic sort": "not pressed",
    "heap sort": "not pressed", "counting sort": "not pressed", "merge sort": "not pressed", "generate array": "not pressed",
    "bitonic alert": "not pressed"};

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);

    // Initializes number of bars and their size
    numberOfBars = initialNumberBars;
    for (i = 0; i < numberOfBars; i++){
        barSize[i] = round(random(20, windowHeight*0.8));
        barColor[i] = "default";
    }

    // sliderNBars
    sliderNBars = createSlider(4, 100, initialNumberBars, 1); // min, max, default, step

    sliderMsDelay = createSlider(0, 1000, 1000 - msDelay, 20);

}


async function draw(){
    background(backgroundColor);


    // when sliderNBars changes value calls the updateNumberBars() function
    sliderNBars.changed(updateNumberBars);
    sliderNBars.position(windowWidth*0.128, windowHeight*0.015);
    sliderNBars.size(windowWidth*0.1,windowHeight*0.035);

    sliderMsDelay.changed(updateDelay);
    sliderMsDelay.position(windowWidth*0.29, windowHeight*0.015);
    sliderMsDelay.size(windowWidth*0.1,windowHeight*0.035);

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
        // sliderNBars Text
        fill(menuTextColor);
        noStroke();
        textAlign(CENTER);
        textSize(windowHeight * 0.03);
        text("# of bars: " + sliderNBars.value(), windowWidth * 0.13 + windowWidth * 0.1 / 2, windowHeight * 0.08);
        textSize(windowHeight * 0.03);
        text("animation speed", windowWidth * 0.29 + windowWidth * 0.1 / 2, windowHeight * 0.08);
    }
    fill(menuColor[0]+menuDetailColorOffset,menuColor[1]+menuDetailColorOffset,menuColor[2]+menuDetailColorOffset);
    rect(windowWidth*0.04 + windowWidth*0.06,0, 8,windowHeight*0.1,);

    if (sorting==false) {
        fill(menuColor[0] + menuDetailColorOffset, menuColor[1] + menuDetailColorOffset, menuColor[2] + menuDetailColorOffset);
        rect(windowWidth * 0.045 + windowWidth * 0.21, 0, 8, windowHeight * 0.1,);
    }

    fill(menuColor[0]+menuDetailColorOffset,menuColor[1]+menuDetailColorOffset,menuColor[2]+menuDetailColorOffset);
    rect(windowWidth*0.04 + windowWidth*0.38,0, 8,windowHeight*0.1,);

    fill(menuColor[0]+menuDetailColorOffset,menuColor[1]+menuDetailColorOffset,menuColor[2]+menuDetailColorOffset);
    rect(windowWidth*0.04 + windowWidth*0.84,0, 8,windowHeight*0.1,);

    if (sorting==false) {
        // Sort button
        if (sortingType=="not defined"){
            fill(109, 116, 154);
        }
        else if (buttons["sort button"]=="not pressed") {
            fill(menuTextColor);
        }
        else{
            fill(255,0,0);
        }
        noStroke();
        textAlign(CENTER);
        textSize(windowHeight * 0.04);
        text("Sort!", windowWidth * 0.94, windowHeight * 0.065);


        if (buttons["generate array"]=="not pressed") {
            fill(menuTextColor);
        }
        else{
            fill(255,0,0);
        }
        textSize(windowHeight * 0.03);
        text("generate\nnew array", windowWidth * 0.05, windowHeight * 0.04);

    }

    drawSortNames();
    drawSortRectangles();
    overButtons();

    rectMode(CORNER);
    if (sorting){
        done = false;
        fill(255, 0, 0);
        noStroke();
        textAlign(CENTER);
        textSize(windowHeight*0.04);
        text("Sorting...", windowWidth*0.94, windowHeight*0.065);

        sliderNBars.hide();
        sliderMsDelay.hide();


        if (sortingType == "bubble sort" && runningSort == false){
            runningSort = true;
            BubbleSort(barSize);
        }
        else if(sortingType == "quick sort" && runningSort == false){
            runningSort = true;
            QuickSort(barSize, 0, numberOfBars-1);
        }
        else if(sortingType == "insertion sort" && runningSort == false){
            runningSort = true;
            InsertionSort(barSize);
        }
        else if(sortingType == "selection sort" && runningSort == false){
            runningSort = true;
            SelectionSort(barSize);
        }
        else if(sortingType == "bitonic sort" && runningSort == false){
            if (powerOfTwo(numberOfBars)) {
                runningSort = true;
                BitonicSort(barSize, 0, numberOfBars, 1);
            }
            else{
                bitonicMsg = true;
                if (bitonicMsg){
                    rectMode(CENTER);
                    fill(menuColor);
                    strokeWeight(windowHeight * 0.02);
                    stroke(menuDetailColorOffset + menuColor[0], menuDetailColorOffset + menuColor[1], menuDetailColorOffset + menuColor[2]);
                    rect(windowWidth / 2, windowHeight / 2, windowWidth * 0.3, windowHeight * 0.36);
                    rectMode(CORNER);
                    noStroke();
                    fill(menuTextColor);
                    textSize(windowHeight * 0.04);
                    text("Bitonic Sort only works on arrays\nwhere the number of elements is \n a power of two.\n Eg. n = 4, 8, 16, 32, 64", windowWidth / 2,
                        windowHeight / 2 - windowHeight * 0.11);

                    fill(255,0,0)
                    if (buttons["bitonic alert"]=="not pressed") {
                        fill(menuTextColor);
                    }
                    text ("Ok", windowWidth / 2, windowHeight / 2 + windowHeight*0.14);

                    //rect(windowWidth / 2, windowHeight / 2 + windowHeight*0.125, windowHeight * 0.06, windowHeight * 0.035)
                    rectMode(CORNER);
                }
            }
        }
        else if(sortingType == "merge sort" && runningSort == false){
            runningSort = true;
            MergeSort(barSize, 0, numberOfBars-1);
        }
        else if(sortingType == "heap sort" && runningSort == false){
            runningSort = true;
            HeapSort(barSize);
        }
        else if(sortingType == "counting sort" && runningSort == false){
            runningSort = true;
            CountingSort(barSize);
        }

        if (detectSortingComplete(barSize)){
            restorePickingSorter();
        }

        if (sortingType!="not defined"){
            fill(menuTextColor);
            textAlign(CENTER);
            textSize(windowHeight * 0.04);
            text("Time complexity: " + getTimeComplexVal(), windowWidth * 0.255, windowHeight * 0.065);
        }
    }
}

function getTimeComplexVal(){
    switch(sortingType){
        case "bubble sort":
            return "O(n^2)";
        case "quick sort":
            return "O(n log n)";
        case "insertion sort":
            return "O(n^2)";
        case "merge sort":
            return "O(n log n)";
        case "selection sort":
            return "O(n^2)";
        case "heap sort":
            return "O(n log n)";
        case "bitonic sort":
            return "O(log^2 n)";
        case "counting sort":
            return "O(n+k)";
    }
}

function restorePickingSorter(){
    sorting = false;
    sliderNBars.show();
    sliderMsDelay.show();
    runningSort = false;
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
    text("Bubble Sort", windowWidth*0.5, windowHeight*0.04);

    // Quick Sort
    fill(255,0,0);
    if (buttons["quick sort"]=="not pressed") {
        fill(menuTextColor);
    }
    if(sortingType=="quick sort"){
        fill(255, 73, 73);
    }
    text("Quick Sort", windowWidth*0.5, windowHeight*0.08);

    // Insertion Sort
    fill(255,0,0);
    if (buttons["insertion sort"]=="not pressed") {
        fill(menuTextColor);
    }
    if(sortingType=="insertion sort"){
        fill(255, 73, 73);
    }
    text("Insertion Sort", windowWidth*0.6, windowHeight*0.04);

    // Merge Sort
    fill(255,0,0);
    if (buttons["merge sort"]=="not pressed") {
        fill(menuTextColor);
    }
    if(sortingType=="merge sort"){
        fill(255, 73, 73);
    }
    text("Merge Sort", windowWidth*0.6, windowHeight*0.08);

    // Selection Sort
    fill(255,0,0);
    if (buttons["selection sort"]=="not pressed") {
        fill(menuTextColor);
    }
    if(sortingType=="selection sort"){
        fill(255, 73, 73);
    }
    text("Selection Sort", windowWidth*0.7, windowHeight*0.04);

    // Bitonic Sort
    fill(255,0,0);
    if (buttons["bitonic sort"]=="not pressed") {
        fill(menuTextColor);
    }
    if(sortingType=="bitonic sort"){
        fill(255, 73, 73);
    }
    text("Bitonic Sort", windowWidth*0.8, windowHeight*0.04);

    // Heap Sort
    fill(255,0,0);
    if (buttons["heap sort"]=="not pressed") {
        fill(menuTextColor);
    }
    if(sortingType=="heap sort"){
        fill(255, 73, 73);
    }
    text("Heap Sort", windowWidth*0.7, windowHeight*0.08);

    // Counting Sort
    fill(255,0,0);
    if (buttons["counting sort"]=="not pressed") {
        fill(menuTextColor);
    }
    if(sortingType=="counting sort"){
        fill(255, 73, 73);
    }
    text("Counting Sort", windowWidth*0.8, windowHeight*0.08);
}

function detectSortingComplete(array){
    for (let i=0; i<array.length;i++){
        if (barColor[i] != "sorted"){
            return;
        }
    }
    return true;
}

function drawSortRectangles(){
    fill(255,0,0,0);
    noStroke();
    rectMode(CENTER);

    bubbleRect = rect(windowWidth*0.5, windowHeight*0.03, windowHeight*0.16, windowHeight*0.03);
    quickRect = rect(windowWidth*0.5, windowHeight*0.07, windowHeight*0.14, windowHeight*0.03);
    insertionRect = rect(windowWidth*0.6, windowHeight*0.03, windowHeight*0.18, windowHeight*0.03);
    selectionRect = rect(windowWidth*0.7, windowHeight*0.03, windowHeight*0.19, windowHeight*0.03);
    bitonicRect = rect(windowWidth*0.8, windowHeight*0.03, windowHeight*0.155, windowHeight*0.03);
    heapRect = rect(windowWidth*0.7, windowHeight*0.07, windowHeight*0.135, windowHeight*0.035);
    countingRect = rect(windowWidth*0.8, windowHeight*0.07, windowHeight*0.185, windowHeight*0.035);
    mergeRect = rect(windowWidth*0.6, windowHeight*0.07, windowHeight*0.15, windowHeight*0.035);

    sortRect = rect(windowWidth*0.94, windowHeight*0.05, windowHeight*0.085, windowHeight*0.04);
    generateRect = rect(windowWidth*0.05, windowHeight*0.05, windowHeight*0.135, windowHeight*0.07);

}

function overButtons(){
    if ((mouseX > windowWidth*0.5 - windowHeight*0.16/2) && mouseX < (windowWidth*0.5+windowHeight*0.16/2) && (mouseY > windowHeight*0.03-windowHeight*0.03/2) && mouseY < (windowHeight*0.03 + windowHeight*0.03/2)){
        buttons["bubble sort"] = "pressed";
    }
    else{
        buttons["bubble sort"] = "not pressed";
    }

    if ((mouseX > windowWidth / 2 - windowHeight * 0.06/2) && mouseX < (windowWidth / 2+windowHeight * 0.06/2) && (mouseY > windowHeight / 2 + windowHeight*0.125-windowHeight * 0.035/2) && mouseY < (windowHeight / 2 + windowHeight*0.125 + windowHeight * 0.035/2)){
        buttons["bitonic alert"] = "pressed";
    }
    else{
        buttons["bitonic alert"] = "not pressed";
    }


    if ((mouseX > windowWidth*0.5 - windowHeight*0.14/2) && mouseX < (windowWidth*0.5+windowHeight*0.14/2) && (mouseY > windowHeight*0.07-windowHeight*0.03/2) && mouseY < (windowHeight*0.07 + windowHeight*0.03/2)){
        buttons["quick sort"] = "pressed";
    }
    else{
        buttons["quick sort"] = "not pressed";
    }

    if ((mouseX > windowWidth*0.94 - windowHeight*0.085/2) && mouseX < (windowWidth*0.94+windowHeight*0.085/2) && (mouseY > windowHeight*0.05-windowHeight*0.04/2) && mouseY < (windowHeight*0.05 + windowHeight*0.04/2)){
        buttons["sort button"] = "pressed";
    }
    else{
        buttons["sort button"] = "not pressed";
    }

    if ((mouseX > windowWidth*0.05 - windowHeight*0.135/2) && mouseX < (windowWidth*0.05+windowHeight*0.135/2) && (mouseY > windowHeight*0.05-windowHeight*0.07/2) && mouseY < (windowHeight*0.05 + windowHeight*0.07/2)){
        buttons["generate array"] = "pressed";
    }
    else{
        buttons["generate array"] = "not pressed";
    }

    if ((mouseX > windowWidth*0.6 - windowHeight*0.18/2) && mouseX < (windowWidth*0.6+windowHeight*0.18/2) && (mouseY > windowHeight*0.03-windowHeight*0.03/2) && mouseY < (windowHeight*0.03 + windowHeight*0.03/2)){
        buttons["insertion sort"] = "pressed";
    }
    else{
        buttons["insertion sort"] = "not pressed";
    }

    if ((mouseX > windowWidth*0.7 - windowHeight*0.19/2) && mouseX < (windowWidth*0.7+windowHeight*0.19/2) && (mouseY > windowHeight*0.03-windowHeight*0.03/2) && mouseY < (windowHeight*0.03 + windowHeight*0.03/2)){
        buttons["selection sort"] = "pressed";
    }
    else{
        buttons["selection sort"] = "not pressed";
    }
    if ((mouseX > windowWidth*0.8 - windowHeight*0.155/2) && mouseX < (windowWidth*0.8+windowHeight*0.155/2) && (mouseY > windowHeight*0.03-windowHeight*0.03/2) && mouseY < (windowHeight*0.03 + windowHeight*0.03/2)){
        buttons["bitonic sort"] = "pressed";
    }
    else{
        buttons["bitonic sort"] = "not pressed";
    }

    if ((mouseX > windowWidth*0.7- windowHeight*0.135/2) && mouseX < (windowWidth*0.7+windowHeight*0.135/2) && (mouseY > windowHeight*0.07-windowHeight*0.035/2) && mouseY < (windowHeight*0.07 + windowHeight*0.035/2)){
        buttons["heap sort"] = "pressed";
    }
    else{
        buttons["heap sort"] = "not pressed";
    }

    if ((mouseX > windowWidth*0.8 - windowHeight*0.185/2) && mouseX < (windowWidth*0.8+windowHeight*0.185/2) && (mouseY > windowHeight*0.07-windowHeight*0.035/2) && mouseY < (windowHeight*0.07 + windowHeight*0.035/2)){
        buttons["counting sort"] = "pressed";
    }
    else{
        buttons["counting sort"] = "not pressed";
    }

    if ((mouseX > windowWidth*0.6 - windowHeight*0.15/2) && mouseX < (windowWidth*0.6+windowHeight*0.15/2) && (mouseY > windowHeight*0.07-windowHeight*0.035/2) && mouseY < (windowHeight*0.07 + windowHeight*0.035/2)){
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

    if (buttons["bitonic alert"] == "pressed"){
        if (bitonicMsg){
            bitonicMsg = false;
            restorePickingSorter();
        }
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

    if (buttons["generate array"] == "pressed"){
        if(sorting==false) {
            barSize = [];
            barColor = []
            numberOfBars = sliderNBars.value();
            for (i = 0; i < numberOfBars; i++) {
                barSize[i] = round(random(20, windowHeight * 0.8));
                barColor[i] = "default";
            }
        }
    }

    if (buttons["sort button"] == "pressed"){
        if(sortingType!="not defined"){
        sorting = true;}
    }
}

function powerOfTwo(x) {
    return (Math.log(x)/Math.log(2)) % 1 === 0;
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

function DelayLimit(value, direction){
    // direction = 1, limits faster end of spectrum
    // direction = 0, limits slower end of spectrum
    let delay;
    if (direction==1){
        if(msDelay<value){delay=value;}
        else{delay=msDelay;}
        return delay;
    }
    else{
        if(msDelay>value){delay=value;}
        else{delay=msDelay;}
        return delay;
    }
}

async function BubbleSort(array){

    // if msDelay = 0, looks bad :(
    var delay = DelayLimit(20, 1);

    for (i=0; i<array.length; i++){
        for (j=0; j<array.length-1-i;j++){
            barColor[j] = "pivot";
            barColor[j+1] = "partition";
            var a = array[j];
            var b = array[j+1];

            if (a>b){
                await ASYNCswap(array, j, j+1,delay);
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

    for (i=start; i<=end;i++){
        barColor[i] = "sorted";
    }
    await sleep(msDelay/2);
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
            await ASYNCswap(array, i, pivotIndex, msDelay/2);
            barColor[pivotIndex] = "default"
            pivotIndex++;
            barColor[pivotIndex] = "pivot"
        }
    }

    await ASYNCswap(array, pivotIndex, end, msDelay/2);

    for (let i = start; i<end; i++){
        if (i != pivotIndex) {
            barColor[i] = "default";
        }
    }

    return pivotIndex;
}

async function InsertionSort(array){

    // if msDelay = 0, looks bad :(
    var delay = DelayLimit(20, 1);

    for (i=1; i<array.length;i++){

        pivot = array[i];
        barColor[i] = "pivot";

        j = i-1;
        temp = j;
        barColor[j] = "partition";

        while (j >=0 && array[j] > pivot){
            await ASYNCswap(array, j+1, j, delay);
            j -=1;
            barColor[j+1] = "partition";
            if (j+2 != i){
            barColor[j+2] = "default";}
        }

        barColor[j+1]="default"
        barColor[temp] = "default";
    }
    await sleep(delay/2);
    for (i=0; i<array.length;i++){
        barColor[i] = "sorted";
        await sleep(delay/2);
    }
}

async function SelectionSort(array){
    
    // if msDelay = 0, looks bad :(
    var delay = DelayLimit(20, 1);

    for (i=0;i<array.length;i++){

        barColor[i] = "pivot";
        var minIndex = i;

        for (j=i+1;j<array.length;j++){
            barColor[j] = "partition";
            if (array[j] < array[minIndex]){
                minIndex = j;
            }
            await sleep(delay);
            barColor[j] = "default";
        }
        await ASYNCswap(array, minIndex, i, delay);
        barColor[i] = "sorted";
    }


}

async function BitonicSort(array, start, arraySize, direction){
    if (arraySize>1){
        let k = arraySize/2;

        await BitonicSort(array, start, k, 1);
        await BitonicSort(array, start+k, k, 0);
        await BitonicMerge(array, start, arraySize, direction);
    }
}

async function BitonicSwap(array, i, j, direction){

    var delay = DelayLimit(120, 1);

    barColor[i] = "pivot";
    barColor[j] = "partition";
    if ((direction==1 && array[i]>array[j]) || (direction==0 && array[i]<array[j])){
        await sleep(delay);
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    else{await sleep(delay);}
    barColor[i] = "default";
    barColor[j] = "default";
}

async function BitonicMerge(array, start, numberElements, direction){
    var delay = DelayLimit(120, 1);
    if (numberElements>1){
        let k = numberElements/2;
        for (let i=start; i<start + k; i++){
            await BitonicSwap(array, i, i+k, direction);
        }
        await BitonicMerge(array, start, k, direction);
        await BitonicMerge(array, start+k, k, direction);
        if (numberElements == numberOfBars){
            for (i =0; i<numberOfBars;i++){
                await sleep(delay);
                barColor[i] = "sorted";
            }
        }
    }
}


async function MergeSort(array, start, end){
    if (start < end) {
        var midPoint = Math.floor((start + end)/2);

        await MergeSort(array, start, midPoint);
        await sleep(msDelay/2);

        await MergeSort(array, midPoint+1, end);
        await sleep(msDelay/2);

        await Merge(array, start, midPoint, end);
        await sleep(msDelay/2);

    }
}


async function Merge(array, start, mid, end){
    // Merges two sorted subarrays

    // Copy sub-arrays to L and R
    var n1 = mid - start + 1; //size of L array
    var n2 = end - mid; // size of R array

    var Left = [];
    var Right = [];

    // Makes L array
    for (let i =0; i<n1;i++){
        Left[i] = array[start+i];
    }

    // Makes R array
    for (let j =0; j<n2;j++){
        Right[j] = array[mid + 1 + j];
    }

    // Match indices of sub-arrays and main array
    var i = 0;
    var j = 0;
    var k = start;

    // Until it reachs the end of a sub-array, pick the smallest element among L and R and place it in array
    while (i<n1 && j<n2){

        // Color handling
        if (start == 0 && end == numberOfBars-1){
            barColor[k] = "sorted";
            barColor[k+1] = "pivot";
        }
        else {
            barColor[k] = "pivot";
        }

        // Handling Logic
        if (Left[i] <= Right[j]) {
            array[k] = Left[i];
            i += 1;
        }
        else{
            array[k] = Right[j];
            j+=1;
        }

        // More color handling
        await sleep(msDelay/2);
        if (start != 0 || end != numberOfBars-1){
            barColor[k] = "default";
        }
        else{barColor[k+1] = "default";}

        k += 1;

    }

    // Once we finish one sub-array place the rest of the elements as they are
    while (i<n1){

        array[k] = Left[i];

        // Color handling
        if (start == 0 && end == numberOfBars-1){
            barColor[k] = "sorted";
            barColor[k+1] = "pivot";
        }
        else {
            barColor[k] = "pivot";
        }
        await sleep(msDelay/2);
        if (start != 0 || end != numberOfBars-1){
            barColor[k] = "default";
        }
        else{barColor[k+1] = "default";}


        i += 1;
        k += 1;
    }

    while (j<n2) {

        array[k] = Right[j];

        // Color handling
        if (start == 0 && end == numberOfBars-1){
            barColor[k] = "sorted";
            barColor[k+1] = "pivot";
        }
        else {
            barColor[k] = "pivot";
        }
        await sleep(msDelay/2);
        if (start != 0 || end != numberOfBars-1){
            barColor[k] = "default";
        }
        else{barColor[k+1] = "default";}


        j += 1;
        k += 1;
    }

}



async function CountingSort(array){

    // Fast enough speed
    var delay = DelayLimit(120, 1);

    let maxValue = MaxValue(array);
    let minValue = MinValue(array);
    let counterSize = maxValue + 1;
    var counter = [];

    // Initializing Counter
    for (let i=0; i<counterSize; i++){
        counter[i] = 0;
    }

    // Counting Elements
    for (let i=0; i<array.length; i++){
        counter[array[i]] += 1;
        barColor[i] = "pivot";
        await sleep(delay/2);
        barColor[i] = "default";
    }

    let j = 0;
    for (let i=minValue; i<=maxValue; i++){
        while(counter[i]>0){
            array[j] = i;
            barColor[j] = "sorted";
            j += 1;
            await sleep(delay/2);
            counter[i] -= 1;
        }
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

async function ASYNCswap(array, i, j, delay = msDelay/2){
    await sleep(delay);
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function updateNumberBars(){
    if(sorting==false) {
        barSize = [];
        barColor = []
        numberOfBars = sliderNBars.value();
        for (i = 0; i < numberOfBars; i++) {
            barSize[i] = round(random(20, windowHeight * 0.8));
            barColor[i] = "default";
        }
    }
}

function updateDelay(){
    if (sorting ==false){
        msDelay = 1000 - sliderMsDelay.value();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}