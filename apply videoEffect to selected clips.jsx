// apply videoEffect to selected clips
app.enableQE();
main();

function main() {
var effect = "Mosaic";

if(app.project.activeSequence == null) {
    alert("Please select a sequence first");
    return false;
    }

    var qeSequence = qe.project.getActiveSequence(0);
    var sequence = app.project.activeSequence;
    var videoTracks = sequence.videoTracks;
    
    var thisQETrack, thisVanillaClip;
    for(var i = 0; i < videoTracks.numTracks; i++) {
        thisQETrack = qeSequence.getVideoTrackAt(i);
        for(var e = 0; e < thisQETrack.numItems; e++) {
            if(thisQETrack.getItemAt(e).type.toString() != "Empty") {
                thisVanillaClip = getVanillaClip(thisQETrack.getItemAt(e), i);
                if(thisVanillaClip != null) {
                if(thisVanillaClip.isSelected() == true) {
                    thisQETrack.getItemAt(e).addVideoEffect(qe.project.getVideoEffectByName(effect));
                    }
                }
                }
            }
        }
    
}

function getVanillaClip(qeClip, trackIndex) {
        for(var c = 0; c < app.project.activeSequence.videoTracks[trackIndex].clips.numItems; c++) {
            if(app.project.activeSequence.videoTracks[trackIndex].clips[c].name == qeClip.name && ((app.project.activeSequence.videoTracks[trackIndex].clips[c].end.seconds - app.project.activeSequence.videoTracks[trackIndex].clips[c].start.seconds).toFixed(2) == (qeClip.end.secs - qeClip.start.secs).toFixed(2))) {
                return app.project.activeSequence.videoTracks[trackIndex].clips[c];
                }
            }
    }