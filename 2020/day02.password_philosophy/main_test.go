package main

import "testing"

func TestValidate(t *testing.T) {
	tests := []struct {
		input  string
		expect int
	}{
		{
			`
1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
`,
			2,
		},
	}

	//for c := range tests {
	//
	//}
}
