package day02

import (
	"github.com/stretchr/testify/assert"
	"github.com/vtambourine/adventofcode/2020/challenge"
	"testing"
)

var example = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`

func TestPolicy(t *testing.T) {
	input := challenge.ReadChallengeFromLiteral(example)
	got := Policy(input)
	assert.Equal(t, 2, got)
}

func TestPartOne(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day02.input")
	got := Policy(input)
	assert.Equal(t, 456, got)
}

func TestNewPolicy(t *testing.T) {
	input := challenge.ReadChallengeFromLiteral(example)
	got := NewPolicy(input)
	assert.Equal(t, 1, got)
}

func TestPartTwo(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day02.input")
	got := NewPolicy(input)
	assert.Equal(t, 308, got)
}
