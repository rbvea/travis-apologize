#!/usr/bin/env node
const record = require('node-record-lpcm16')
const stream = require('stream')
const { Detector, Models } = require('snowboy')

const models = new Models()

models.add({
  file: 'travis.pmdl',
  sensitivity: '0.5',
  hotword: 'travis'
})

const detector = new Detector({
  resource: "resources/common.res",
  models: models,
  audioGain: 2.0
});

detector.on('hotword', function (index, hotword) {
  console.log('hotword', index, hotword);
});

const mic = record.start({
  threshold: 0,
  verbose: false
});

mic.pipe(detector)
