package main

import "testing"

func TestSolve(t *testing.T) {
	tests := []struct {
		input  []int
		expect int
	}{
		{
			[]int{
				1721,
				979,
				366,
				299,
				675,
				1456,
			},
			514579,
		},
	}

	for _, c := range tests {
		if result := twoSum(c.input); result != c.expect {
			t.Fatalf("Solve failed")
		}
	}
}

func TestSolve2(t *testing.T) {
	tests := []struct {
		input  []int
		expect int
	}{
		{
			[]int{
				1721,
				979,
				366,
				299,
				675,
				1456,
			},
			241861950,
		},
	}

	for _, c := range tests {
		if result := threeSum(c.input); result != c.expect {
			t.Fatalf("Solve failed")
		}
	}
}
