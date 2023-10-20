
function filterType() {
    // Get the filter type element
    const filterType = document.getElementById('filterType'); 
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterType.addEventListener('change', function() {
            const selectedType = filterType.value;
    
            galleryItems.forEach(function(item) {
                const itemType = item.getAttribute('data-type'); // Get the data-type attribute of the item
    
                if (selectedType === 'All' || selectedType === itemType) { // If the selected type is 'All' or the same as the item type
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
}


document.addEventListener('DOMContentLoaded', function() {
    filterType();
}); 