/* global BLITPUNK */
let cloudFrameNames
let lastCloudFrame

export default function randomCloudFrame (atlas) {
  if (!cloudFrameNames) {
    cloudFrameNames = atlas.frameNames().filter((name) => name.match(/^cloud/))
    console.log('cloudFrameNames', cloudFrameNames)
  }
  let frameName
  do {
    frameName = BLITPUNK.sample(cloudFrameNames)
  } while (frameName === lastCloudFrame)
  lastCloudFrame = frameName
  return atlas.getFrame(frameName)
}
