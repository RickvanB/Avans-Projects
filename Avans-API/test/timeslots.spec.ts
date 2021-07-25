// import app from '../src/app';
// import chai from 'chai';
// import chaiHttp = require('chai-http');
// import 'mocha';

// chai.use(chaiHttp);
// const expect = chai.expect;



// describe('The specs for the timeslots endpoint of the Speedmeet API', () => {

//     // GET
//     it('GET /timeslots should return all timeslots', function(done){
//         chai.request(app)
//             .get('/timeslots')
//             .end(function(err, res){
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.not.be.undefined;
//                 //Check if the first object in the array has keys of Timeslot
//                 // expect(res.body[0]).to.have.keys(['company', 'cvExpirationDate', 'id', 'round', 'shareCv', 'speedmeet', 'student']);
//                 done();
//             });
//     });

//     it('GET /timeslots/1 should return timeslot defined by 1', function(done){
//         chai.request(app)
//             .get('/timeslots/1')
//             .end(function(err, res){
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.not.be.undefined;
//                 //Check if the first object in the array has keys of Timeslot
//                 // expect(res.body).to.have.keys(['company', 'cvExpirationDate', 'id', 'round', 'shareCv', 'speedmeet', 'student']);
//                 done();
//             });
//     });

//     it.skip('PUT /timeslots/1 should update a timeslot at 1', function(done){
//         chai.request(app)
//             .post('/timeslots/1')
//             .end(function(err, res){
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.not.be.undefined;
//                 done();
//             });
//     });

// });

