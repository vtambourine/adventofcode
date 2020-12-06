package day06

import (
	"github.com/vtambourine/adventofcode/2020/challenge"
	"testing"

	"github.com/stretchr/testify/assert"
)

var examples = []string{
	`abc

a
b
c

ab
ac

a
a
a
a

b`,
}

func TestAnyoneYes(t *testing.T) {
	tests := []struct {
		input string
		want  int
	}{
		{examples[0], 11},
	}

	for _, c := range tests {
		input := challenge.ReadChallengeFromLiteral(c.input)
		got := AnyoneYes(input)
		assert.Equal(t, c.want, got)
	}
}

func TestPartOne(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day06.input")
	got := AnyoneYes(input)
	assert.Equal(t, 6775, got)
}

func TestEveryoneYes(t *testing.T) {
	tests := []struct {
		input string
		want  int
	}{
		{examples[0], 6},
	}

	for _, c := range tests {
		input := challenge.ReadChallengeFromLiteral(c.input)
		got := EveryoneYes(input)
		assert.Equal(t, c.want, got)
	}
}

func TestPartTwo(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day06.input")
	got := EveryoneYes(input)
	assert.Equal(t, 3356, got)
}
