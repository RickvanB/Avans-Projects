// import app from '../src/app';
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import 'mocha';
// import {getRepository} from 'typeorm';
// import {Round} from '../src/models/round';
// import {Company} from '../src/models/company';
// import {Student} from '../src/models/student';
// import {Timeslot} from '../src/models/timeslot';
// import {Speedmeet} from '../src/models/speedmeet';

// chai.use(chaiHttp);

// const expect = chai.expect;

// describe('The specs for the rounds endpoint of the Speedmeet API', function() {
//     describe('GET /rounds', function() {
//         it('should return all rounds', function(done) {
//             chai.request(app)
//                 .get('/rounds')
//                 .end(function(err, res){
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(200);
//                     expect(res.body).to.not.be.undefined;
//                     //Check if the first object in the array has keys of Round
//                     expect(res.body[0]).to.have.keys(['id', 'timestart', 'timeend']);

//                     done();
//                 });
//         });
//     });

//     describe('POST /rounds', function() {
//         it('should return 201 when round is saved', function(done) {
//             chai.request(app)
//                 .post('/rounds')
//                 .send({
//                     timestart: '20:00',
//                     timeend: '20:15'
//                 })
//                 .end(function(err, res){
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(201);
//                     expect(res.body).to.not.be.undefined;
//                     //Check if the first object in the array has keys of Round
//                     expect(res.body).to.have.keys(['id', 'timestart', 'timeend']);

//                     getRepository(Round).delete(res.body.id).then(() => {
//                         done();
//                     });
//                 });
//         });

//         it('should create timeslots for all the companies that participate', function(done) {
//             chai.request(app)
//                 .post('/rounds')
//                 .send({
//                     timestart: '20:15',
//                     timeend: '20:30'
//                 })
//                 .end(function(err, res){
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(201);
//                     expect(res.body).to.not.be.undefined;
//                     //Check if the first object in the array has keys of Round
//                     expect(res.body).to.have.keys(['id', 'timestart', 'timeend']);

//                     getRepository(Company)
//                         .createQueryBuilder('company')
//                         .leftJoinAndSelect('company.timeslots', 'timeslot')
//                         .leftJoinAndSelect('timeslot.round', 'round')
//                         .where('company.participates = 1')
//                         .getOne()
//                         .then(company => {
//                             const index = company?.timeslots?.findIndex(t => t.round?.id == res.body.id);

//                             if (index === undefined || index < 0) {
//                                 done(new Error('Timeslot not create for new round'));
//                             } else {
//                                 done();
//                             }
//                         });
//                 });
//         });

//         it('should return 400 when request body is missing parameters', function(done) {
//             chai.request(app)
//                 .post('/rounds')
//                 .send({
//                     timestart: '20:00'
//                 })
//                 .end(function(err, res){
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(400);
//                     expect(res.body).to.not.be.undefined;
//                     expect(res.body).to.have.keys(['code', 'status', 'message']);

//                     done();
//                 });
//         });

//         it('should return 400 when time is not in the right format', function(done) {
//             chai.request(app)
//                 .post('/rounds')
//                 .send({
//                     timestart: '2000',
//                     timeend: '2015'
//                 })
//                 .end(function(err, res){
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(400);
//                     expect(res.body).to.not.be.undefined;
//                     expect(res.body).to.have.keys(['code', 'status', 'message']);

//                     done();
//                 });
//         });
//     });

//     describe('PUT /rounds/:id', function() {
//         it('should return 200 when round is saved', function(done) {
//             chai.request(app)
//                 .put('/rounds/1')
//                 .send({
//                     timestart: '20:00',
//                     timeend: '20:15'
//                 })
//                 .end(function(err, res){
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(200);
//                     expect(res.body).to.not.be.undefined;
//                     //Check if the first object in the array has keys of Round
//                     expect(res.body).to.have.keys(['id', 'timestart', 'timeend']);

//                     done();
//                 });
//         });

//         it('should return 400 when request body is missing parameters', function(done) {
//             chai.request(app)
//                 .put('/rounds/1')
//                 .send({
//                     timestart: '20:00'
//                 })
//                 .end(function(err, res){
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(400);
//                     expect(res.body).to.not.be.undefined;
//                     expect(res.body).to.have.keys(['code', 'status', 'message']);

//                     done();
//                 });
//         });

//         it('should return 400 when time is not in the right format', function(done) {
//             chai.request(app)
//                 .put('/rounds/1')
//                 .send({
//                     timestart: '2000',
//                     timeend: '2015'
//                 })
//                 .end(function(err, res){
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(400);
//                     expect(res.body).to.not.be.undefined;
//                     expect(res.body).to.have.keys(['code', 'status', 'message']);

//                     done();
//                 });
//         });

//         it('should return 404 when round not found in database', function(done) {
//             chai.request(app)
//                 .put('/rounds/10000')
//                 .send({
//                     timestart: '20:00',
//                     timeend: '20:15'
//                 })
//                 .end(function(err, res){
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(404);
//                     expect(res.body).to.not.be.undefined;
//                     expect(res.body).to.have.keys(['code', 'status', 'message']);

//                     done();
//                 });
//         });
//     });

//     describe('DELETE /rounds/:id', function() {
//         it('should return 204 when round is deleted', function(done) {
//             const testRound = new Round();
//             testRound.timestart = '21:00';
//             testRound.timeend = '21:15';

//             getRepository(Round)
//                 .save(testRound).then(round => {

//                     chai.request(app)
//                         .delete(`/rounds/${round.id}`)
//                         .end(function(err, res){
//                             expect(err).to.be.null;
//                             expect(res).to.have.status(204);
//                             expect(res.body).to.not.be.null;

//                             getRepository(Round)
//                                 .createQueryBuilder('round')
//                                 .where('id = :id', {id: round.id})
//                                 .getOne()
//                                 .then(r => {
//                                     expect(r).to.be.undefined;

//                                     done();
//                                 });
//                         });
//                 });
//         });

//         it('should return 403 when student is enrolled to timeslot associated with the round',  function(done) {
//             const testRound = new Round();
//             testRound.timestart = '21:00';
//             testRound.timeend = '21:15';

//             getRepository(Round)
//                 .save(testRound)
//                 .then(async round => {
//                     const timeslot = new Timeslot();
//                     timeslot.speedmeet = await getRepository(Speedmeet).createQueryBuilder().getOne();
//                     timeslot.student = await getRepository(Student).createQueryBuilder().getOne();
//                     timeslot.company = await getRepository(Company).createQueryBuilder().getOne();
//                     timeslot.round = round;
//                     timeslot.shareCv = false;
//                     timeslot.enabled = true;

//                     await getRepository(Timeslot).save(timeslot);

//                     chai.request(app)
//                         .delete(`/rounds/${round.id}`)
//                         .end(function(err, res){
//                             expect(err).to.be.null;
//                             expect(res).to.have.status(403);
//                             expect(res.body).to.not.be.null;

//                             done();
//                         });
//                 });
//         });

//         it('should return 404 when round not found in database', function(done) {
//             chai.request(app)
//                 .delete('/rounds/10000')
//                 .end(function(err, res){
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(404);
//                     expect(res.body).to.not.be.undefined;
//                     expect(res.body).to.have.keys(['code', 'status', 'message']);

//                     done();
//                 });
//         });
//     });
// });
