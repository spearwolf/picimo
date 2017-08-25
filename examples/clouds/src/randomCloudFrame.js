let cloudFrameNames
let lastCloudFrame

export default function randomCloudFrame (blitpunk, atlas) {
  if (!cloudFrameNames) {
    cloudFrameNames = atlas.frameNames().filter((name) => name.match(/^cloud/))
    console.log('cloudFrameNames', cloudFrameNames)
  }
  let frameName
  do {
    frameName = blitpunk.utils.sample(cloudFrameNames)
  } while (frameName === lastCloudFrame)
  lastCloudFrame = frameName
  return atlas.getFrame(frameName)
}
