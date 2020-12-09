package day05

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/vtambourine/adventofcode/2020/challenge"
)

var passes = []struct {
	partition string
	pass      pass
}{
	{"FBFBBFFRLR", pass{44, 5, 357}},
	{"BFFFBBFRRR", pass{70, 7, 567}},
	{"FFFBBBFRRR", pass{14, 7, 119}},
	{"BBFFBBFRLL", pass{102, 4, 820}},
}

func TestParsePass(t *testing.T) {
	for _, p := range passes {
		got := parsePass(p.partition)
		assert.Equal(t, p.pass, got, p.partition)
	}
}

func TestPartOne(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day05.input")
	got := highestSeat(input)
	assert.Equal(t, 970, got)
}

func TestPartTwo(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day05.input")
	got := MissingSeat(input)
	assert.Equal(t, 587, got)
}
