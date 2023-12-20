import supertest from 'supertest'
import chai from 'chai'
import { faker } from '@faker-js/faker';

const request = supertest('http://localhost:8080')
const expect = chai.expect

