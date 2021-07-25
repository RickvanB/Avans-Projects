// import app from '../src/app';
// import chai from 'chai';
// import chaiHttp = require('chai-http');
// import 'mocha';

// chai.use(chaiHttp);
// const expect = chai.expect;

// describe('The specs for the companies endpoint of the Speedmeet API', () => {
    
//     it('GET /companies should return all companies', function(done){
//         chai.request(app)
//             .get('/companies')
//             .end(function(err, res){
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.not.be.undefined;
//                 //Check if the first object in the array has keys of Company
//                 expect(res.body[0]).to.have.keys(['address', 'archived', 'city', 'contacts', 'country', 'description', 'logoPath', 'majors', 'id', 'name', 'participates','registered','timeslots', 'website', 'zipcode']);
//                 done();
//             });
//     });

//     it('POST /companies add a company');

//     it('GET /companies/1 should return company defined by 1', function(done){
//         chai.request(app)
//             .get('/companies/1')
//             .end(function(err, res){
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.not.be.undefined;
//                 //Check if object has keys of Company
//                 expect(res.body).to.have.keys(['address', 'archived', 'city', 'contacts', 'country', 'description', 'logoPath', 'majors', 'id', 'name', 'participates', 'registered', 'website', 'zipcode']);
//                 done();
//             });
//     });

//     it.skip('GET /companies/:id/timeslots should return all timeslots for company defined by :id', function(done){
//         chai.request(app)
//             .get('/companies/1/timeslots')
//             .end(function(err, res){
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.not.be.undefined;
//                 //Check if the first object in the array has keys of Timeslot
//                 expect(res.body[0]).to.have.keys(['id', 'round', 'shareCv', 'student']);
//                 done();
//             });
//     });

//     it.skip('GET /companies/:id/timeslots should return all available timeslots for company defined by :id', function(done){
//         chai.request(app)
//             .get('/companies/1/availabletimeslots')
//             .end(function(err, res){
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.not.be.undefined;
//                 //Check if the first object in the array has keys of Timeslot
//                 expect(res.body[0]).to.have.keys(['id', 'round', 'shareCv', 'student']);
//                 expect(res.body[0].student).to.be.null;
//                 done();
//             });
//     });

//     it('GET /companies/:id/majors should return all the companies intressted majors defind by :id', function(done) {
//         chai.request(app)
//             .get('/companies/1/majors')
//             .end(function(err, res) {
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.not.be.undefined;

//                 done();
//             });
//     });

//     it('PUT /companies/:id/majors should add a major to the companys collection', function(done) {
//         chai.request(app)
//             .put('/companies/1/majors')
//             .set('Accept','application/json')
//             .send([
//                 {
//                     id: 1,
//                     name: 'informatica',
//                     maxEnrollmentsPerCompany: 10
//                 },
//                 {
//                     id: 2,
//                     name: 'CMD',
//                     maxEnrollmentsPerCompany: 10
//                 }
//             ])
//             .end(function(err, res) {
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.not.be.undefined;
                
//                 done();
//             });
//     });

//     it.skip('PUT /companies/1/majors should not add duplicate majors',function(done) {
        
//     });

//     it('PUT /companies/:id should update company defined by id', function(done) {
//         chai.request(app)
//             .put('/companies/1/')
//             .set('Accept','application/json')
//             .send({
//                 id: 1,
//                 name: 'Rabobank',
//                 description: 'De Rabobank is een bank.',
//                 logoPath: null,
//                 address: 'postmanstraat 224',
//                 city: 'Amsterdam',
//                 zipcode: '3445 PM',
//                 country: 'Nederland',
//                 website: 'www.rabobank.nl',
//                 archived: 0,
//                 registered: 1,
//                 participates: true
//             })
//             .end(function(err, res) {
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.not.be.undefined;
                
//                 done();
//             });
//     });

//     it('PUT /companies/:id/archive should archive the company defined by id', function(done) {
//         chai.request(app)
//             .put('/companies/1/archive')
//             .end(function(err, res) {
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.not.be.undefined;
                
//                 done();
//             });
//     });

//     it('DELETE /companies/:id should delete company defined by id', function(done) {
//         chai.request(app)
//             .delete('/companies/1/')
//             .end(function(err, res) {
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.not.be.undefined;
                
//                 done();
//             });
//     });
// });

