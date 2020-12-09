package day06

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/vtambourine/adventofcode/2020/challenge"
)

var example = `abc

a
b
c

ab
ac

a
a
a
a

b`

func TestAnyoneYes(t *testing.T) {
	input := challenge.ReadChallengeFromLiteral(example)
	got := anyoneYes(input)
	assert.Equal(t, 11, got)
}

func TestEveryoneYes(t *testing.T) {
	input := challenge.ReadChallengeFromLiteral(example)
	got := everyoneYes(input)
	assert.Equal(t, 6, got)
}

func TestPartOne(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day06.input")
	got := anyoneYes(input)
	assert.Equal(t, 6775, got)
}

func TestPartTwo(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day06.input")
	got := everyoneYes(input)
	assert.Equal(t, 3356, got)
}
