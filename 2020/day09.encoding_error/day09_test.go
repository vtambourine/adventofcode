package day09

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/vtambourine/adventofcode/2020/challenge"
)

var example = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`

func TestFirstInvalid(t *testing.T) {
	tests := []struct {
		input string
		want  int
	}{
		{
			example,
			127,
		},
	}

	for _, c := range tests {
		input := challenge.ReadChallengeFromLiteral(c.input)
		got := FirstInvalidWithPreamble(input, 5)
		assert.Equal(t, c.want, got)
	}
}

func TestPartOne(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day09.input")
	got := FirstInvalid(input)
	assert.Equal(t, 26796446, got)
}

func TestWeakness(t *testing.T) {
	tests := []struct {
		input string
		want  int
	}{
		{
			example,
			62,
		},
	}

	for _, c := range tests {
		input := challenge.ReadChallengeFromLiteral(c.input)
		got := WeaknessWithPreamble(input, 5)
		assert.Equal(t, c.want, got)
	}
}

func TestPartTwo(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day09.input")
	got := Weakness(input)
	assert.Equal(t, 3353494, got)
}
