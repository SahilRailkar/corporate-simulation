export default class Vector {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    // Updates x and y values based on target vector and distance provided
    moveTowards(target, distance_to_travel){
        if(this.distance(target) < distance_to_travel){
            this.x = target.x
            this.y = target.y
        } else {

            var deltaX = Math.abs(distance_to_travel*((target.x - this.x)/this.distance(target)))
            var deltaY = Math.abs(distance_to_travel*((target.y - this.y)/this.distance(target)))
            
            if(target.x > this.x){
                this.x += deltaX
            } else {
                this.x -= deltaX
            }
            if(target.y > this.y){
                this.y += deltaY
            } else {
                this.y -= deltaY
            }
        }
        return new Vector(this.x, this.y)
    }

    distance(vector){
        return Math.sqrt(
            Math.pow(vector.x - this.x, 2) + Math.pow(vector.y - this.y, 2)
        )
    }
}
