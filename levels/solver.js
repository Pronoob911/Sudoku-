

	var sudokuBoard1=[[0,5,7,0,9,3,0,0,4],
					 [0,2,1,5,0,7,8,0,0],
					 [9,4,0,0,0,0,0,0,0],
					 [0,0,2,0,0,5,0,0,6],
					 [0,0,0,4,0,9,0,0,0],
					 [7,0,0,1,0,0,2,0,0],
					 [0,0,0,0,0,0,0,8,5],
					 [0,0,6,9,0,4,3,2,0],
					 [2,0,0,8,5,0,6,7,0]];

	var sudokuBoard2=[[0,0,0,5,2,8,0,0,0],
					 [7,2,8,0,0,0,0,5,0],
					 [0,5,0,9,0,0,0,0,6],
					 [0,4,1,0,6,0,8,0,0],
					 [0,0,0,1,3,4,0,0,0],
					 [0,0,2,0,8,0,1,6,0],
					 [8,0,0,0,0,1,0,2,0],
					 [0,1,0,0,0,0,3,4,5],
					 [0,0,0,6,5,3,0,0,0]];

	var sudokuBoard3=[[4,0,0,0,0,0,6,7,0],
					 [0,5,0,1,0,0,0,0,0],
					 [0,0,0,0,0,0,0,0,0],
					 [0,7,0,0,3,0,0,0,0],
					 [0,0,0,0,0,0,2,6,0],
					 [0,8,0,5,0,0,0,0,0],
					 [2,0,1,0,0,0,0,0,5],
					 [6,0,0,0,0,2,0,0,0],
					 [0,0,0,0,8,0,0,0,0]];

	var sudokuBoard4=[[2,0,0,0,0,0,0,1,0],
					 [0,0,6,0,0,3,0,0,0],
					 [0,0,0,0,7,0,0,0,0],
					 [0,6,0,0,4,0,5,0,0],
					 [0,0,0,8,0,0,0,0,2],
					 [0,0,7,0,0,0,0,0,0],
					 [0,1,0,0,0,0,3,0,0],
					 [8,0,0,1,0,0,0,0,0],
					 [9,0,0,2,0,0,0,0,0]];

//var solve=document.querySelector('#solve');
//solve.addEventListener("click",sudokuSolver(sudokuBoard));
//sudokuSolver(sudokuBoard);

function compare(userBoard,board){
	let count=0
	for(let i=0;i<9;i++){
		for(let j=0;j<9;j++){
			let a=document.getElementById('r'+i+'c'+j)
			if(userBoard[i][j]!=board[i][j]){
				a.style.backgroundColor="red";
			}
			count++;
		}
	}
}

function printBoard(board){
	if(localStorage.getItem("board")==null){
		localStorage.setItem("board",JSON.stringify(board));
		return;
	}

	for(let x=0;x<9;x++)
	{
		
		for(let y=0;y<9;y++){
			
			document.getElementById('r'+x+'c'+y).innerText=board[x][y];
			}
			
			
		
}
localStorage.setItem("board",JSON.stringify(board));
	}



	function isFull(board)
	{
		for(let i=0;i<9;i++)
		{
			for(let j=0;j<9;j++)
			{
				if(board[i][j]===0)
					return false;
			}
		}
		return true;
	}

	function possibleEntries(board,i,j)
	{
		var possibilityArray=new Array();
		
		for(let x=1;x<10;x++)
		{
			possibilityArray[x]=0;
		}

		for(let y=0;y<9;y++)
		{
			
			if(board[i][y]!=0){
				possibilityArray[board[i][y]]=1;
			}

		}
		for(let x=0;x<9;x++)
		{
			if(board[x][j]!=0){
				possibilityArray[board[x][j]]=1;
			}
		}

		var k=0;
		var l=0;

		if(i>=0 && i<=2)
		{
			k=0;
		}
		else if(i>=3 && i<=5){
			k=3;
		}
		else{
			k=6;
		}
		if(j>=0 && j<=2)
		{
			l=0;
		}
		else if(j>=3 && j<=5){
			l=3;
		}
		else{
			l=6;
		}
		for(let x=k;x<k+3;x++)
		{
			for(let y=l;y<l+3;y++)
			{
				if(board[x][y]!=0)
					possibilityArray[board[x][y]]=1;
			}
		}

		for(let x=1;x<10;x++)
		{
			if(possibilityArray[x]==0){
				possibilityArray[x]=x;
			}
			else{
				possibilityArray[x]=0;
			}
		}
		//console.log(possibilityArray);
		return possibilityArray;
	}


	function sudokuSolver(board){
		let i=0,j=0;

		var possibilities=new Array();
		if(isFull(board))
		{
			console.log("board is sovled");
			printBoard(board);
			
			return;
		}
		else{
			for(let x=0;x<9;x++)
			{
				for(let y=0;y<9;y++)
				{
					if(board[x][y]==0){
						i=x;
						j=y;
						break;
					}
				}
			}
		}

		possibilities=possibleEntries(board,i,j);
		

		


			for(let x=1;x<10;x++)
			{
				if(possibilities[x]!=0){
					board[i][j]=possibilities[x];
				
					sudokuSolver(board);
				}
				
			}
			
			//backtracking
			board[i][j]=0;


		
	}


    











