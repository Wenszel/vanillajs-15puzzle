var picture = {
    pictureImage: null,
    numberOfPicture:0,
    loadPicture: function(){
        var image = document.createElement("img")
        image.src = "img/img"+this.numberOfPicture+".jpg"
        this.pictureImage = image
        image.style.width = this.pictureWidth
        image.style.height = this.pictureHeight
    },
    changePicture: function(action){
        this.numberOfPicture+=action
        if(this.numberOfPicture<0){
            this.numberOfPicture = 3
        }
        if(this.numberOfPicture>3){
            this.numberOfPicture = 0
        }
        var newImage = document.createElement("img")
        newImage.src="img/img"+this.numberOfPicture+".jpg"
        newImage.style.width= "200px"
        newImage.style.height = "200px"
        var previewBox = document.querySelector("#preview")
        if(action==1)previewBox.appendChild(newImage)
      /*  if(action==-1){
            previewBox.prepend(newImage)
        }*/
        setTimeout(()=>{
            if(action==1)previewBox.scrollBy(200,0)
        },100)    
    }
}
var timer = {
    timerElement:null,
    generateTimer: function(){
        var timer = document.createElement("div")
        hour1 = document.createElement("img")
        hour1.src = "img/cyferki/c0.gif"
        hour2 = document.createElement("img")
        hour2.src = "img/cyferki/c0.gif"
        colon1 = document.createElement("img")
        colon1.src = "img/cyferki/colon.gif"
        minute1 = document.createElement("img")
        minute1.src = "img/cyferki/c0.gif"
        minute2 = document.createElement("img")
        minute2.src = "img/cyferki/c0.gif"
        colon2 = document.createElement("img")
        colon2.src = "img/cyferki/colon.gif"
        secunde1 = document.createElement("img")
        secunde1.src = "img/cyferki/c0.gif"
        secunde2= document.createElement("img")
        secunde2.src = "img/cyferki/c0.gif"
        dot = document.createElement("img")
        dot.src = "img/cyferki/dot.gif"
        milisecunde1= document.createElement("img")
        milisecunde1.src = "img/cyferki/c0.gif"
        milisecunde2= document.createElement("img")
        milisecunde2.src = "img/cyferki/c0.gif"
        milisecunde3= document.createElement("img") 
        milisecunde3.src = "img/cyferki/c0.gif"
        timer.appendChild(hour1)
        timer.appendChild(hour2)
        timer.appendChild(colon1)
        timer.appendChild(minute1)
        timer.appendChild(minute2)
        timer.appendChild(colon2)
        timer.appendChild(secunde1)
        timer.appendChild(secunde2)
        timer.appendChild(dot)
        timer.appendChild(milisecunde1)
        timer.appendChild(milisecunde2)
        timer.appendChild(milisecunde3)
        document.body.appendChild(timer)
        this.timerElement = timer 
    },
    startTimer: function(){
        time = Date.now()
           f = () =>{
            actuallTime = Date.now()
            timePassed= actuallTime-time
            dateFromMs = new Date(timePassed)
            hours = (dateFromMs.getHours()-1).toString()
            minutes = (dateFromMs.getMinutes()).toString()
            secundes = (dateFromMs.getSeconds()).toString()
            millisecundes = (dateFromMs.getMilliseconds()).toString()
            while(hours.length<2){
                hours="0"+hours
            }
            while(minutes.length<2){
                minutes="0"+minutes
            }
            while(secundes.length<2){
                secundes="0"+secundes
            }
            while(millisecundes.length<3){
                millisecundes="0"+millisecundes
            }
            timerTime = hours+minutes+secundes+millisecundes
            milisecunde3.src = "img/cyferki/c"+timerTime[8]+".gif"
            milisecunde2.src= "img/cyferki/c"+timerTime[7]+".gif"
            milisecunde1.src = "img/cyferki/c"+timerTime[6]+".gif"
            secunde2.src = "img/cyferki/c"+timerTime[5]+".gif"
            secunde1.src = "img/cyferki/c"+timerTime[4]+".gif"
            minute2.src = "img/cyferki/c"+timerTime[3]+".gif"
            minute1.src = "img/cyferki/c"+timerTime[2]+".gif"
            hour2.src = "img/cyferki/c"+timerTime[1]+".gif"
            hour1.src = "img/cyferki/c"+timerTime[0]+".gif"
            timerTime = hours+":"+minutes+":"+secundes+"."+millisecundes
           }
           setInterval(f,1)     
    },
    returnTime: function(){
        return timerTime
    },
    resetTimer: function(){
        time = Date.now()
        timerTime = ""
    },
    stopTimer: function(){
        clearInterval(f)
    }
}
var playground = {
    areaElement: document.getElementById("area"),
    size: null,
    imagePartWidth: undefined,
    imagePartHeight: undefined,
    imagePartArray: [],
    emptyPart: {
        xPosition: null,
        yPosition: null
    },
    isGenerated: false,
    winChecker: function(){
        var isWin = true
        for(i=0;i<playground.imagePartArray.length;i++){
            if(playground.imagePartArray[i].correctXPosition == playground.imagePartArray[i].xPosition&&
            playground.imagePartArray[i].correctYPosition == playground.imagePartArray[i].yPosition){
            continue     
        }else{
            isWin = false
            break        
        }
        }
        if(isWin){
            setTimeout(()=>{
                let time = timer.returnTime()
                nameOfWinner = prompt("Wygrałeś w czasie "+time+" \nPodaj nazwę do zapisania wyniku:")
                document.cookie = document.cookie + nameOfWinner+" "+time+"\n"
                
            },100)
            timer.resetTimer()   
        }
    },
    generatePlayground: function(size){
        if(this.isGenerated){
            document.getElementById("area").innerHTML=" "
            this.imagePartArray = []
            this.emptyPart.xPosition= null
            this.emptyPart.yPosition = null
            timer.resetTimer()
        }else{
            timer.generateTimer()
        }
        this.isGenerated = true
        picture.loadPicture()
        this.imagePartWidth = Math.floor(picture.pictureImage.width/size)
        this.imagePartHeight = Math.floor(picture.pictureImage.height/size)
        this.areaElement.style.width = this.imagePartWidth*size +"px"
        this.areaElement.style.height = this.imagePartHeight*size+"px"
        this.size = size
        for(var i = 0; i<size;i++){
            for(var j = 0; j<size;j++){
                if(j!=size-1 || i!=size-1){
                    let imagePart = {
                        xPosition: null,
                        yPosition: null,
                        correctXPosition: null,
                        correctYPosition: null,
                        canvasImage: null,
                        generateImagePart: function(){
                            this.xPosition = j*playground.imagePartWidth
                            this.yPosition = i*playground.imagePartHeight
                            this.correctXPosition = j*playground.imagePartWidth
                            this.correctYPosition = i*playground.imagePartHeight
                            var canvas = document.createElement("canvas")
                            canvas.width = playground.imagePartWidth
                            canvas.height = playground.imagePartHeight
                            canvas.getContext('2d').drawImage(picture.pictureImage, this.xPosition, this.yPosition, playground.imagePartWidth,playground.imagePartHeight,0,0, playground.imagePartWidth,playground.imagePartHeight)
                            canvas.style.left= this.xPosition+"px"
                            canvas.style.top = this.yPosition+"px"
                            canvas.onclick= ()=> {
                                if (
                                ((playground.emptyPart.xPosition == imagePart.xPosition)&& ((playground.emptyPart.yPosition==imagePart.yPosition-playground.imagePartWidth)||(playground.emptyPart.yPosition==imagePart.yPosition+playground.imagePartWidth)))||
                                ((playground.emptyPart.yPosition == imagePart.yPosition)&& ((playground.emptyPart.xPosition==imagePart.xPosition-playground.imagePartWidth)||(playground.emptyPart.xPosition==imagePart.xPosition+playground.imagePartWidth)))
                                ){
                                
                                canvas.style.left = playground.emptyPart.xPosition+"px"
                                canvas.style.top = playground.emptyPart.yPosition+"px"
                                playground.emptyPart.xPosition = imagePart.xPosition
                                playground.emptyPart.yPosition = imagePart.yPosition
                                imagePart.xPosition = parseInt(canvas.style.left)
                                imagePart.yPosition = parseInt(canvas.style.top)
                                playground.winChecker()
                                }
                            }
                            this.canvasImage=canvas
                            playground.areaElement.appendChild(canvas)
                        },

                    }
                this.imagePartArray.push(imagePart)
                imagePart.generateImagePart()
                }else{
                    playground.emptyPart.xPosition = playground.imagePartWidth*j
                    playground.emptyPart.yPosition = playground.imagePartHeight*i
                }
            }
        }
        var numberOfMoves = Math.pow(this.size,3)*2
        let counter = 0
        do{
            this.shufflePlayground(counter)
            counter++
        }while(counter<numberOfMoves)
        setTimeout(timer.startTimer, numberOfMoves*10)
    },
    findPossibleMoves: function(){
        possibleMovesArray = []
        if(playground.emptyPart.yPosition-playground.imagePartWidth>=0){
            let possibleMoves = {
                xPosition: playground.emptyPart.xPosition,
                yPosition: playground.emptyPart.yPosition-playground.imagePartWidth
            }
            possibleMovesArray.push(possibleMoves)
        } 
        if(playground.emptyPart.yPosition+playground.imagePartWidth<=picture.pictureImage.width-playground.imagePartWidth)
        { 
            let possibleMoves = {
                xPosition: playground.emptyPart.xPosition,
                yPosition: playground.emptyPart.yPosition+playground.imagePartWidth
            }
            possibleMovesArray.push(possibleMoves)
        }
        if(playground.emptyPart.xPosition-playground.imagePartWidth>=0){
            let possibleMoves = {
                xPosition: playground.emptyPart.xPosition-playground.imagePartWidth,
                yPosition: playground.emptyPart.yPosition,
            }
            possibleMovesArray.push(possibleMoves)
        }
        if(playground.emptyPart.xPosition+playground.imagePartWidth<=picture.pictureImage.width-playground.imagePartWidth){
            let possibleMoves = {
                xPosition: playground.emptyPart.xPosition+playground.imagePartWidth,
                yPosition: playground.emptyPart.yPosition
            }
            possibleMovesArray.push(possibleMoves)
        }
        return possibleMovesArray
    },
    shufflePlayground: function(counter){
        setTimeout(()=>{
            let possibleMoves = this.findPossibleMoves()
            let nextMove = possibleMoves[Math.floor(Math.random()*possibleMoves.length)]
            let objectToMove = this.imagePartArray.find( i =>
                i.xPosition == nextMove.xPosition &&
                i.yPosition == nextMove.yPosition
            )
            objectToMove.xPosition = playground.emptyPart.xPosition
            objectToMove.yPosition = playground.emptyPart.yPosition
            objectToMove.canvasImage.style.left = playground.emptyPart.xPosition+"px"
            objectToMove.canvasImage.style.top = playground.emptyPart.yPosition+"px"
            playground.emptyPart.xPosition=  nextMove.xPosition
            playground.emptyPart.yPosition= nextMove.yPosition
            
        },10*counter)
    }      
}
var laderBoard={
    topPlayers3:[],
    topPlayers4:[],
    topPlayers5:[],
    topPlayers6:[],
    laderBoardWindowElement:null,
    openLaderBoard: function(){
        let laderBoardWindow = document.createElement("div")
        laderBoardWindow.style.zIndex=1
        laderBoardWindow.style.backgroundColor="grey"
        laderBoardWindow.style.height="500px"
        laderBoardWindow.style.width="300px"
        laderBoardWindow.style.position="relative"
        laderBoardWindow.style.top="-200px"
        laderBoardWindow.textContent = document.cookie
        for(i=3;i<7;i++){
            let modeButton = document.createElement("button")
            modeButton.textContent= i+"x"+i
            modeButton.style.opacity="1"
            laderBoardWindow.appendChild(modeButton)    
        }
        let exitButton = document.createElement("button")
        exitButton.textContent="X"
        exitButton.style.borderRadius="50%"
        exitButton.style.width="20px"
        exitButton.style.height="20px"
        exitButton.style.position="absolute"
        exitButton.style.right="0px"
        exitButton.style.top="0px"
        document.body.style.opacity="0.5"
        laderBoardWindow.style.opacity="1"
       
        laderBoardWindow.appendChild(exitButton)
        this.laderBoardWindowElement=laderBoardWindow
        exitButton.onclick=this.closeLaderBoard
        document.body.appendChild(laderBoardWindow)
    },
    closeLaderBoard: function(){
        laderBoard.laderBoardWindowElement.style.display="none"
        document.body.style.opacity="1" 
    }
}