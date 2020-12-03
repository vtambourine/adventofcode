package day03

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/vtambourine/adventofcode/2020/challenge"
)

var examples = []string{
	`..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`,
}

func TestTrees(t *testing.T) {
	tests := []struct {
		input string
		want  int
	}{
		{
			examples[0],
			7,
		},
	}

	for _, c := range tests {
		input := challenge.ReadChallengeFromLiteral(c.input)
		got := Trees(input)
		assert.Equal(t, c.want, got)
	}
}

func TestPartOne(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day03.input")
	got := Trees(input)
	assert.Equal(t, 220, got)
}

func TestSlopes(t *testing.T) {
	tests := []struct {
		input string
		want  int
	}{
		{
			examples[0],
			336,
		},
	}

	for _, c := range tests {
		input := challenge.ReadChallengeFromLiteral(c.input)
		got := Slopes(input)
		assert.Equal(t, c.want, got)
	}
}

func TestPartTwo(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day03.input")
	got := Slopes(input)
	assert.Equal(t, 2138320800, got)
}
