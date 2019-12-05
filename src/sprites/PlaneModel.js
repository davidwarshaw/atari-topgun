export default class PlaneModel {
  constructor(config) {
    this.config = config;

    this.tickFraction = 0.1;

    this.takenOff = false;
    this.landed = false;
    this.crashed = false;
    this.isOverCarrier = true;

    this.maxAirSpeed = 1200;
    this.minAirSpeed = 0;
    this.maxY = 30000;
    this.minY = 0;

    this.density = 1.229;
    this.gravity = -32;
    this.maxAngleOfAttack = 0.25 * Math.PI;

    this.throttle = {
      min: 0,
      max: 100,
      unit: 5,
      value: 0,
    };
    this.stick = {
      min: -100,
      max: 100,
      unit: 10,
      value: 0,
    };

    this.velocity = new Phaser.Math.Vector2(0, 0);
    this.position = new Phaser.Math.Vector2(0, 0);
  }

  update(delta) {
    console.log('\n\n\n');

    const tickDelta = delta * this.tickFraction;

    const { mass, liftCoefficient, dragCoefficient, thrustCoefficient } = this.config;

    const massVector = new Phaser.Math.Vector2(mass, mass);
    console.log(`massVector: ${massVector.x}, ${massVector.y}`);

    const liftVector = new Phaser.Math.Vector2(liftCoefficient, liftCoefficient);
    console.log(`liftVector: ${liftVector.x}, ${liftVector.y}`);

    const dragVector = new Phaser.Math.Vector2(dragCoefficient, dragCoefficient);
    console.log(`dragVector: ${dragVector.x}, ${dragVector.y}`);

    const gravity = new Phaser.Math.Vector2(0, this.gravity);
    console.log(`gravity: ${gravity.x}, ${gravity.y}`);

    const angleOfAttack = this.angleOfAttackFromStick();
    console.log(`angleOfAttack: ${angleOfAttack}`);
    const power = this.powerFromThrottle(thrustCoefficient);
    console.log(`power: ${power}`);

    const thrust = new Phaser.Math.Vector2(0, 0).setToPolar(angleOfAttack, power).divide(massVector);
    console.log(`thrust: ${thrust.x}, ${thrust.y}`);

    const lift = this.calculateLift(liftVector);
    console.log(`lift: ${lift.x}, ${lift.y}`);

    const drag = this.calculateDrag(dragVector);
    console.log(`drag: ${drag.x}, ${drag.y}`);

    const acceleration = gravity.add(thrust).add(lift).add(drag);
    console.log(`acceleration: ${acceleration.x}, ${acceleration.y}`);

    //acceleration.setTo(Phaser.Math.RoundTo(acceleration.x, 1), Phaser.Math.RoundTo(acceleration.y, 1));
    console.log(`rounded: acceleration: ${acceleration.x}, ${acceleration.y}`);

    const normalizedAcceleration = acceleration.clone().multiply(new Phaser.Math.Vector2(tickDelta, tickDelta));
    console.log(`normalizedAcceleration: ${normalizedAcceleration.x}, ${normalizedAcceleration.y}`);

    console.log(`pre: this.velocity: ${this.velocity.x}, ${this.velocity.y}`);
    this.velocity = this.velocity.add(normalizedAcceleration);
    console.log(`post: this.velocity: ${this.velocity.x}, ${this.velocity.y}`);

    if (this.velocity.length() > this.maxAirSpeed) {
      this.velocity.setToPolar(this.velocity.angle(), this.maxAirSpeed);
      console.log('this.velocity.length()');
      console.log(this.velocity.length());
    }
    //this.velocity.setTo(Phaser.Math.RoundTo(this.velocity.x, 1), Phaser.Math.RoundTo(this.velocity.y, 1));
    console.log(`rounded and capped: this.velocity: ${this.velocity.x}, ${this.velocity.y}`);

    console.log(`this.velocity: ${this.velocity.x}, ${this.velocity.y}`);
    const normalizedVelocity = this.velocity.clone().multiply(new Phaser.Math.Vector2(tickDelta, tickDelta));
    console.log(`normalizedVelocity: ${normalizedVelocity.x}, ${normalizedVelocity.y}`);

    this.position = this.position.add(normalizedVelocity);
    if (this.position.y > this.maxY) {
      this.position.setTo(this.position.x, this.maxY);
      //this.stick.value = 0;
    }
    if (this.position.y < this.minY) {
      this.position.setTo(this.position.x, this.minY);
      this.velocity.setTo(0, 0);
    }
    console.log(`this.position: ${this.position.x}, ${this.position.y}`);

    // Take off
    console.log(`takenOff: ${this.takenOff}`);
    if (!this.takenOff && this.position.y >= 500) {
      this.takenOff = true;
    }

    this.checkLanding();
  }

  calculateLift(liftVector) {
    const scaledliftVector = this.velocity.clone().multiply(liftVector);
    return scaledliftVector.setToPolar(scaledliftVector.angle() + (Math.PI / 2), scaledliftVector.length());
  }

  calculateDrag(dragVector) {
    return this.velocity.clone().negate().multiply(dragVector);
  }

  angleOfAttackFromStick() {
    const sign = this.stick.value < 0 ? 1 : -1;
    const percent = 1 - ((this.stick.max - Math.abs(this.stick.value)) / (this.stick.max));
    return sign * percent * this.maxAngleOfAttack;
  }

  powerFromThrottle(thrustCoefficient) {
    const percent = 1 - ((this.throttle.max - Math.abs(this.throttle.value)) / (this.throttle.max));
    return percent * thrustCoefficient;
  }

  checkLanding() {
    console.log('checkLanding()');
    // Able to land
    console.log(`isOverCarrier: ${this.isOverCarrier}`);
    if (this.takenOff && this.position.y <= 1000 && this.isOverCarrier) {
      if (Math.abs(this.velocity.y) <= 50 && Math.abs(this.velocity.x) <= 200) {
        console.log('Landed!!!');
        this.landed = true;
      }
      else {
        console.log('Crashed!!!');
        this.crashed = true;
      }
    }
    else if (this.takenOff && this.position.y <= 10) {
      this.crashed = true;
    }
  }

  setIsOverCarrier(value) {
    this.isOverCarrier = value;
  }

  screenFractionFromPosition() {
    return (this.maxY - this.position.y) / this.maxY;
  }

  screenFractionFromVelocity() {
    return Phaser.Math.Clamp(1 - ((this.maxAirSpeed - Math.min(this.velocity.length(), this.maxAirSpeed)) / this.maxAirSpeed), 0, 1);
  }

  increaseThrottle() {
    this.throttle.value = Phaser.Math.Clamp(
      this.throttle.value + this.throttle.unit, this.throttle.min, this.throttle.max);
  }

  decreaseThrottle() {
    this.throttle.value = Phaser.Math.Clamp(
      this.throttle.value - this.throttle.unit, this.throttle.min, this.throttle.max);
  }

  stickForward() {
    this.stick.value = Phaser.Math.Clamp(
      this.stick.value + this.stick.unit, this.stick.min, this.stick.max);
  }

  stickBack() {
    this.stick.value = Phaser.Math.Clamp(
      this.stick.value - this.stick.unit, this.stick.min, this.stick.max);
  }
}
