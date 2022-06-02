
// O(nlogn) time complexity
function heapSort(arr) {
		var n = arr.length;

		// Build max heap (rearrange array)
		for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

		// One by one extract an element from heap
		for (let i = n - 1; i > 0; i--) {
			// Move current root to end
			let temp = arr[0];
			arr[0] = arr[i];
			arr[i] = temp;

			// call max heapify on the reduced heap
			heapify(arr, i, 0);
		}
	}


  // O(logn) time comolexity
	function heapify(arr, n, i)
	{
		var largest = i; // Initialize largest as root
		var l = 2 * i + 1; // left = 2*i + 1
		var r = 2 * i + 2; // right = 2*i + 2

		// If left child is larger than root
		if (l < n && arr[l] > arr[largest])
			largest = l;

		// If right child is larger than largest so far
		if (r < n && arr[r] > arr[largest])
			largest = r;

		// If largest is not root
		if (largest != i) {
			var swap = arr[i];
			arr[i] = arr[largest];
			arr[largest] = swap;

			// Recursively heapify the affected sub-tree
			heapify(arr, n, largest);
		}
}


let arr = [ 5, 12, 11, 13, 4, 6, 7 ];
let n = arr.length;

heapSort(arr);
console.log(arr); // [4,  5,  6, 7, 11, 12, 13]
