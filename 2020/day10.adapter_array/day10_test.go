package day10

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/vtambourine/adventofcode/2020/challenge"
)

var example = `16
10
15
5
1
11
7
19
6
12
4
`

func TestDistribution(t *testing.T) {
	input := challenge.ReadChallengeFromLiteral(example)
	got := distribution(input)
	assert.Equal(t, 7*5, got)
}

func TestArrangements(t *testing.T) {
	input := challenge.ReadChallengeFromLiteral(example)
	got := arrangements(input)
	assert.Equal(t, 8, got)
}

func TestPartOne(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day10.input")
	got := distribution(input)
	assert.Equal(t, 2310, got)
}

func TestPartTwo(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day10.input")
	got := arrangements(input)
	assert.Equal(t, 64793042714624, got)
}
