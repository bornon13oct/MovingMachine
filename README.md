# MovingMachine

Imagine a moving machine which is made up of several motors. We can add a new motor to the
machine whenever we wish to. We have full control over switching any motor on or off as well as
increasing or decreasing the speed of each motor. There are two parts (webpages) to the machine:

1. One that has the switches and the controls of all the motors
2. One that displays to us the health of the running machine

## Part 1: One that has the switches and the controls

To see the live demo of this webpage got to : https://rocky-ocean-23308.herokuapp.com/

This part of the machine is be a simple webpage with the following components:

![image](https://user-images.githubusercontent.com/25412134/38756129-06c67d38-3f86-11e8-8a5d-216b02844509.png)

![image](https://user-images.githubusercontent.com/25412134/38752373-8c46559a-3f78-11e8-99a7-dcabf9d1d7bd.png) 

This is a button, clicking on which will add a new row to the above table and add a
new motor for us with all the functionalities as the above motors.

#### What happens when a user clicks to Switch On a motor?

1. The motor starts moving at the speed of 5 units.
2. Our machine starts recording the speed of that motor every second and stores it in a
database.

#### What happens when a user clicks to Switch Off a motor?

1. The motor stops moving and the speed becomes 0.
2. Our machine still records the speed (which is 0 now) of that motor every second and stores it
in the database.

#### What happens when a user clicks to Increase the speed of a motor?

1. With each click, the speed of the motor increases by 1 unit.
2. The machine continues to record the current speed of the motor.

#### What happens when a user clicks to Decrease the speed of a motor?

3. With each click, the speed of the motor decreases by 1 unit.
4. The machine continues to record the current speed of the motor.

#### Also note:

1. The speed can never be a negative number, the least it can go to is 0.
2. When the motor is in Switched Off mode, increasing /decreasing its speed has not effect on it.

#### What happens when a user clicks to Add a new motor?

A new row is added with a new motor (its name will be in sequence, e.g. in the above case the next
motor will have the name Motor003). This motor has all the functionalities of the previous motors and
the machine starts to record its speed as well every second.



## Part 2: One that displays to us the health of the running machine

To see the live demo of this webpage got to : https://rocky-ocean-23308.herokuapp.com/health

This is a separate page where we get to see the health of our machine. This page gets
continuously updated with values and machine status, as we switch on/off and control the speed of our
motors in the other page.

These are the components of this page:

![image](https://user-images.githubusercontent.com/25412134/38753088-ed3b7ff4-3f7a-11e8-80e2-fa81dc5d1b11.png)

#### What is Motor Health?

Motor Health light should turn red when a motor speed crosses 10. It remains green when the speed
is below or equal to 10.

#### What does “Fix the motor” button do?

When a user clicks on this button, immediately the speed of that motor becomes the default speed,
which is 5 units. This should get reflected in our previous page as well where we were switching
on/off and controlling the speed of the motor. The user should be able to use this button only when
the Motor Health light is in Red mode.

#### What happens here when a user adds a new motor on the previous page?

Similar to the previous page, this page should also start displaying the new motor as a new row,
along with its Motor Health and its Fix the motor button.
