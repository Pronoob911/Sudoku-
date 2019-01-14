

//set all fields to editable
	for(let i=0;i<9;i++){
		for(let j=0;j<9;j++){
			document.getElementById("r"+i+"c"+j).setAttribute("contenteditable",true);
		}
	}

	function solveSudoku(){
		
		var array=(JSON.parse(localStorage.getItem("board")));
		
		for(let i=0;i<9;i++){
			for(let j=0;j<9;j++){
				document.getElementById("r"+i+"c"+j).innerText=array[i][j];
			}
		}
	}


	function SudokuCreate(maxNum) {
		
		var numSet= [];
		var sudokuArray= [];
		var iterations= 0;
		

		
		for (var i= 1; i<= maxNum; i++) {
			numSet.push(i);
			sudokuArray.push(new Array(maxNum));
		}
		
		//console.log(sudokuArray);

		//size of sub boxes
		var horizontalBoxSize= 3,
			verticalBoxSize=3;		
			

		//find random number from 0 to max
		function getRandomInt(max) {
			return Math.floor(Math.random() * max);
		}

		//places numbers in the sudoku array
		function placeNumber(num, arr) {
			var lastRowIndex=arr.length-1,
				lastRow=arr[lastRowIndex], 
				rowsToCheck=lastRowIndex % verticalBoxSize, 
				safeIndexes=[],
				randomSafeIndex; 

			// find a safe column to place the number in the current row
			function findSafeIndex(boxesUsed) {
				
				function boxSafe(index) {
					var indexBox= Math.floor(index/horizontalBoxSize);
					if (boxesUsed.indexOf(indexBox)>= 0) {
						return false;
					} else {
						return true;
					}
				}

				//loop through current row to find a safe place to put the number
				for (var indexInLastRow= 0, rowLen= lastRow.length; indexInLastRow< rowLen; indexInLastRow++) {
					var columnSafe= true; 

					for (var rowIndex= arr.length-1; rowIndex>= 0; rowIndex--) {
						if(arr[rowIndex][indexInLastRow]===num) {
							columnSafe= false;
						}
					}

					//check current index is empty, column is safe, and that current box is safe
					if(lastRow[indexInLastRow]=== undefined && columnSafe && boxSafe(indexInLastRow)) {
						safeIndexes.push(indexInLastRow);
					}
				}

				
				return safeIndexes[getRandomInt(safeIndexes.length)];
			}

			var horizontalBoxesUsed = []; 

			if (rowsToCheck> 0) {
				for (var i= rowsToCheck; i> 0; i--) {
					var horizontalBox = Math.floor(arr[lastRowIndex- i].indexOf(num)/ horizontalBoxSize);
					horizontalBoxesUsed.push( horizontalBox );
				}
			}

			
			randomSafeIndex= findSafeIndex(horizontalBoxesUsed);

			
			if(randomSafeIndex=== undefined) {
				return num;
			} else {
				lastRow[randomSafeIndex] = num;
				return true;
			}
		}

		//loop through the numbers to set them in the sudoku
		for (var i= numSet.length- 1; i>= 0; i--) {
			var workingArray= [];
			var possible= true;
			while (sudokuArray.length> 0) {
				workingArray.push(sudokuArray.shift());//add a row to workingArray from the sudokuArray

				possible= placeNumber(numSet[i], workingArray);

				if(possible!== true) {// if not possible make new puzzle
					iterations++;
					return SudokuCreate(maxNum);
				}
			}

			
			sudokuArray = workingArray;
		}

		
		//console.table(sudokuArray);

		 //store fully solved sudoku in localstorage
		 localStorage.setItem("board",JSON.stringify(sudokuArray));
	     //console.table(sudokuArray);
    	removeDigits();
    	//make 45 cellls empty
    	function removeDigits(){
	     let count =45;
	     
	     while(count>=0){
	     	let cellId=Math.floor((Math.random()*81)+1)-1;
	     	
	     	
	     	let i=Math.floor(cellId/9);
	     	
	     	let j=cellId%9;
	     	 // if(j!=0)
	     	 // 	j=j-1;

	     	if(sudokuArray[i][j]!=""){
	     		count--;
	     		sudokuArray[i][j]="";
	     	}
	     }
		 }
		 //localStorage.setItem("board",JSON.stringify(sudokuArray));
	    

	     
		 
		
		 	//print board and set not editable for already present elements
		for(let i=0;i<9;i++){
			for(let j=0;j<9;j++){
				let currentId=document.getElementById("r"+i+"c"+j);

				currentId.innerText=sudokuArray[i][j];
				if(currentId.innerText!=""){
					currentId.setAttribute("contenteditable",false);

				}
				else{
					currentId.style.textDecoration="underline";
				}
			
			}
		}
				 
		
		
		 

	}
