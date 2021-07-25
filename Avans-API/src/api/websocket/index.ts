import socketio from 'socket.io';
import passport from '../../config/passport';
import {Handshake, Socket} from 'socket.io';
import {IProfile} from '../../models/interfaces/iProfile';

const io = socketio();

// Authenticate client
io.use((socket: Socket, next) => {
    let req: Handshake = socket.handshake;

    passport.authenticate('jwt', (err: Error, user: IProfile, info: any) => {
        if (err || !user) {
            next(new Error('Not authenticated'));
            return;
        }

        // @ts-ignore still need to figure out how to do Declaration Merging (https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
        socket.user = user;
        next();
    })(req, null, next);
});

io.on('connection', function(socket: Socket) {
    // @ts-ignore still need to figure out how to do Declaration Merging
    let user: IProfile = socket.user;

    // Handle request from the socket
    console.info(user.name + ' Conneted to Websocket');

    //Join & Leave Room
    socket.on('subscribe', function(data) { 
        socket.join(data.room); 
        console.info('Websocket joined Room ' + data.room);

    });
    
    socket.on('unsubscribe', function(data) { 
        socket.leave(data.room); 
        console.info('Websocket left Room ' + data.room);
    });
});


export default io;
