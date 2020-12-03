package day01

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/vtambourine/adventofcode/2020/challenge"
)

var examples = []string{
	`1721
979
366
299
675
1456`,
}

func TestTwo(t *testing.T) {
	tests := []struct {
		input string
		want  int
	}{
		{
			examples[0],
			514579,
		},
	}

	for _, c := range tests {
		input := challenge.ReadChallengeFromLiteral(c.input)
		got := Two(input)
		assert.Equal(t, c.want, got)
	}
}

func TestPartOne(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day01.input")
	got := Two(input)
	assert.Equal(t, 878724, got)
}

func TestThree(t *testing.T) {
	tests := []struct {
		input string
		want  int
	}{
		{
			examples[0],
			241861950,
		},
	}

	for _, c := range tests {
		input := challenge.ReadChallengeFromLiteral(c.input)
		got := Three(input)
		assert.Equal(t, c.want, got)
	}
}

func TestPartTwo(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day01.input")
	got := Three(input)
	assert.Equal(t, 201251610, got)
}
