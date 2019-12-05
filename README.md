# TopGun but for the Atari 5200

The Atari 5200 console debuted in 1982 and was discontinuing in 1984, a life time of just two short years. Movie tie-in games were common in this era (the notorious Atari E.T. game was also released in 1982) and the 1986 blockbuster Top Gun was no exception. These games were among the very first combat flight sims and featured relatively complex flight models paired with extremely limited graphics. Ocean Software's first take on the license rendered actual 3D wireframes of the planes.

https://www.mobygames.com/game/dos/top-gun/screenshots/gameShotId,27590/

Ocean released no fewer than seven (!) ports of the licensed game to consoles and home computers, including the Atari ST, but not the Atari 5200. Even with the advances over the 2600, the 5200 would never be able to render a wireframe and HUD. But what if they had rendered the flight model in a way that earlier consoles could handle?

Just kidding...

Unless?...

TopGun but for the Atari 5200 is a thought experiment that runs a real 2D physics simulated flight model, then renders the output in a way that could have been displayed on a very early console.

Instructions
Take off and then land on the carrier.

W: Throttle up

S: Throttle down

A: Pull back on stick

D: Push forward on stick

To take off, push the throttle all the way up, and pull the stick all the way back.

You must be below 200 knots and 500 feet to land on the deck of the carrier.

It's okay if you miss it the first time, it'll come around again.

Notes on the Physics
The game runs a 2D physics simulation to model flight. A net force vector is calculated by adding vectors for gravity, thrust, lift, and drag. Inputs to these force vectors are taken from physical constants and the F14 spec:

https://en.wikipedia.org/wiki/Grumman_F-14_Tomcat

The net force vector is turned into acceleration, and this acceleration is then  integrated into velocity, and subsequently position. To keep the plane within a nice play area, angle of attack is bounded to +/- 1/4 Pi, and both overall elevation and speed are bounded. To make gameplay a little snappier, the amount of thrust provided for a given throttle setting has been fudged upward a lot. This results in simulated net forces that would be fatal to a real pilot.

Landing is successful at <200 knots and <500 feet to make the game reasonable to play, but is possible at <150 knots and <20 feet.
