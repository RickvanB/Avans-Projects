// import app from '../src/app';
// import chai from 'chai';
// import chaiHttp = require('chai-http');
// import 'mocha';

// chai.use(chaiHttp);
// const expect = chai.expect;

// describe('The specs for the students endpoint of the Speedmeet API', () => {
//     it('GET /students/:id/timeslots should return all timeslots for that student', function(done){
//         chai.request(app)
//             .get('/students/1/timeslots')
//             .end(function(err, res){
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.not.be.undefined;
//                 expect(res.body).to.be.a('array');
//                 done();
//             });
//     });

//     it('GET /students/:id/timeslots should return 404 when student not found', function(done){
//         chai.request(app)
//             .get('/students/non-existing/timeslots')
//             .end(function(err, res){
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(404);
//                 expect(res.body).to.not.be.undefined;
//                 expect(res.body).to.have.key('error');
//                 done();
//             });
//     });
// });

