//prevent dragging
window.ondragstart = function() { return false; } 

document.addEventListener('DOMContentLoaded', function () {
    var stack;

    stack = gajus.Swing.Stack();

    [].forEach.call(document.querySelectorAll('.stack li'), function (targetElement) {
        stack.createCard(targetElement);

        targetElement.classList.add('in-deck');
    });
//    $('#state-mark').hide()
    stack.on('throwout', function (e) {
        console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');
        
        console.log(e);
        if(e.throwDirection == -1){
            //dislike
            $('#' + e.target.id).find('#state-mark-like').hide();
            $('#' + e.target.id).find('#state-mark-dislike').show();
        }else{
            //like
            console.log('Like !' + e.target.id)
            $('#' + e.target.id).find('#state-mark-dislike').hide();
            $('#' + e.target.id).find('#state-mark-like').show();
        }
        e.target.classList.remove('in-deck');
    });

    stack.on('throwin', function (e) {
        console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');
        $('#' + e.target.id).find('#state-mark-like').hide();
        $('#' + e.target.id).find('#state-mark-dislike').hide();
        //neutral the card
        e.target.classList.add('in-deck');
    });
    
    //do the like/unlike handler
});