package day02

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/vtambourine/adventofcode/2020/challenge"
)

var example = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`

func TestValidPassports(t *testing.T) {
	input := challenge.ReadChallengeFromLiteral(example)
	got := validPassports(input)
	assert.Equal(t, 2, got)
}

func TestStrictlyValidPassports(t *testing.T) {
	input := challenge.ReadChallengeFromLiteral(example)
	got := strictlyValidPassports(input)
	assert.Equal(t, 1, got)
}

func TestPartOne(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day02.input")
	got := validPassports(input)
	assert.Equal(t, 456, got)
}

func TestPartTwo(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day02.input")
	got := strictlyValidPassports(input)
	assert.Equal(t, 308, got)
}
