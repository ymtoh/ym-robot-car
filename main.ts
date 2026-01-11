function moveRight () {
    motionbit.runMotor(MotionBitMotorChannel.M1, MotionBitMotorDirection.Backward, TOP_SPEED_A)
    motionbit.runMotor(MotionBitMotorChannel.M3, MotionBitMotorDirection.Forward, TOP_SPEED_A)
    motionbit.runMotor(MotionBitMotorChannel.M2, MotionBitMotorDirection.Forward, TOP_SPEED_B)
    motionbit.runMotor(MotionBitMotorChannel.M4, MotionBitMotorDirection.Backward, TOP_SPEED_B)
}
// Glide to the Left
function spinLeft () {
    motionbit.runMotor(MotionBitMotorChannel.M1, MotionBitMotorDirection.Forward, TOP_SPEED_A)
    motionbit.runMotor(MotionBitMotorChannel.M3, MotionBitMotorDirection.Backward, TOP_SPEED_A)
    motionbit.runMotor(MotionBitMotorChannel.M2, MotionBitMotorDirection.Forward, TOP_SPEED_B)
    motionbit.runMotor(MotionBitMotorChannel.M4, MotionBitMotorDirection.Backward, TOP_SPEED_B)
}
function moveUpperRight () {
    motionbit.runMotor(MotionBitMotorChannel.M3, MotionBitMotorDirection.Backward, TOP_SPEED_A)
    motionbit.runMotor(MotionBitMotorChannel.M2, MotionBitMotorDirection.Backward, TOP_SPEED_B)
}
function backward () {
    motionbit.runMotor(MotionBitMotorChannel.M1, MotionBitMotorDirection.Backward, TOP_SPEED_A)
    motionbit.runMotor(MotionBitMotorChannel.M3, MotionBitMotorDirection.Backward, TOP_SPEED_A)
    motionbit.runMotor(MotionBitMotorChannel.M2, MotionBitMotorDirection.Backward, TOP_SPEED_B)
    motionbit.runMotor(MotionBitMotorChannel.M4, MotionBitMotorDirection.Backward, TOP_SPEED_B)
}
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    bt_data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
    if (bt_data == "c") {
        motionbit.brakeMotor(MotionBitMotorChannel.All)
    } else if (bt_data == "f") {
        forward()
    } else if (bt_data == "b") {
        backward()
    } else if (bt_data == "l") {
        moveLeft()
    } else if (bt_data == "r") {
        moveRight()
    } else if (bt_data == "AC1") {
        spinRight()
    } else if (bt_data == "AC-1") {
        spinLeft()
    } else if (bt_data == "AU-1") {
        moveUpperLeft()
    } else if (bt_data == "AU1") {
        moveUpperRight()
    } else if (bt_data == "A") {
        spinRight()
    } else if (bt_data == "B") {
        spinLeft()
    } else {
        motionbit.brakeMotor(MotionBitMotorChannel.All)
    }
})
function moveUpperLeft () {
    motionbit.runMotor(MotionBitMotorChannel.M1, MotionBitMotorDirection.Forward, TOP_SPEED_A)
    motionbit.runMotor(MotionBitMotorChannel.M4, MotionBitMotorDirection.Forward, TOP_SPEED_B)
}
function spinRight () {
    motionbit.runMotor(MotionBitMotorChannel.M1, MotionBitMotorDirection.Backward, TOP_SPEED_A)
    motionbit.runMotor(MotionBitMotorChannel.M3, MotionBitMotorDirection.Forward, TOP_SPEED_A)
    motionbit.runMotor(MotionBitMotorChannel.M2, MotionBitMotorDirection.Backward, TOP_SPEED_B)
    motionbit.runMotor(MotionBitMotorChannel.M4, MotionBitMotorDirection.Forward, TOP_SPEED_B)
}
function forward () {
    motionbit.runMotor(MotionBitMotorChannel.M1, MotionBitMotorDirection.Forward, TOP_SPEED_A)
    motionbit.runMotor(MotionBitMotorChannel.M3, MotionBitMotorDirection.Forward, TOP_SPEED_A)
    motionbit.runMotor(MotionBitMotorChannel.M2, MotionBitMotorDirection.Forward, TOP_SPEED_B)
    motionbit.runMotor(MotionBitMotorChannel.M4, MotionBitMotorDirection.Forward, TOP_SPEED_B)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    if (Move) {
        Move = 0
    } else {
        Move = 1
    }
})
function moveLeft () {
    motionbit.runMotor(MotionBitMotorChannel.M1, MotionBitMotorDirection.Forward, TOP_SPEED_A)
    motionbit.runMotor(MotionBitMotorChannel.M3, MotionBitMotorDirection.Backward, TOP_SPEED_A)
    motionbit.runMotor(MotionBitMotorChannel.M2, MotionBitMotorDirection.Backward, TOP_SPEED_B)
    motionbit.runMotor(MotionBitMotorChannel.M4, MotionBitMotorDirection.Forward, TOP_SPEED_B)
}
let bt_data = ""
let Move = 0
let TOP_SPEED_B = 0
let TOP_SPEED_A = 0
makerbit.connectUltrasonicDistanceSensor(DigitalPin.P12, DigitalPin.P2)
basic.showIcon(IconNames.Square)
basic.showIcon(IconNames.Diamond)
basic.showIcon(IconNames.SmallSquare)
basic.showIcon(IconNames.SmallDiamond)
basic.showLeds(`
    . . . . .
    . . . . .
    . . # . .
    . . . . .
    . . . . .
    `)
TOP_SPEED_A = 150
TOP_SPEED_B = TOP_SPEED_A * 1.4
Move = 0
basic.forever(function () {
    if (Move) {
        if (makerbit.isUltrasonicDistanceLessThan(15, DistanceUnit.CM)) {
            motionbit.brakeMotor(MotionBitMotorChannel.All)
            motionbit.setAllRgbPixelsColor(0xff0000)
            basic.pause(500)
            moveRight()
            basic.pause(2000)
            motionbit.brakeMotor(MotionBitMotorChannel.All)
        } else {
            forward()
            motionbit.setAllRgbPixelsColor(0x00ff00)
        }
    } else {
        motionbit.brakeMotor(MotionBitMotorChannel.All)
        motionbit.clearAllRgbPixels()
    }
})
