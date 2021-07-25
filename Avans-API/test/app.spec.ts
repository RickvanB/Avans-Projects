// import app from '../src/app';
// import chai from 'chai';
// import chaiHttp = require('chai-http');
// import 'mocha';
// import typeorm from '../src/config/typeorm';

// chai.use(chaiHttp);
// const expect = chai.expect;



// describe('The global specs for the Speedmeet API', () => {

//     before(function(done) {
//         typeorm().then(connection => {
//             done();
//         }, err => {
//             console.log(err);
//         });
//     });

//     //Speedmeet
//     it('GET /speedmeet should return the speedmeet', function(done){
//         chai.request(app)
//             .get('/speedmeet')
//             .end(function(err, res){
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.not.be.undefined;
//                 //Check if the object has keys of Speedmeet
//                 expect(res.body).to.have.keys(['description', 'end', 'enrollmentStart', 'id', 'mapPath', 'maxEnrollmentsPerStudent', 'start', 'title', 'welcomeMessage']);
//                 done();
//             });
//     });

// });

