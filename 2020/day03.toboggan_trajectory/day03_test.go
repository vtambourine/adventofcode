package day03

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/vtambourine/adventofcode/2020/challenge"
)

var example = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`

func TestTrees(t *testing.T) {
	input := challenge.ReadChallengeFromLiteral(example)
	got := trees(input)
	assert.Equal(t, 7, got)
}

func TestSlopes(t *testing.T) {
	input := challenge.ReadChallengeFromLiteral(example)
	got := slopes(input)
	assert.Equal(t, 336, got)
}

func TestPartOne(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day03.input")
	got := trees(input)
	assert.Equal(t, 220, got)
}

func TestPartTwo(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day03.input")
	got := slopes(input)
	assert.Equal(t, 2138320800, got)
}
