package day01

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/vtambourine/adventofcode/2020/challenge"
)

var example = `1721
979
366
299
675
1456`

func TestTwoSum(t *testing.T) {
	input := challenge.ReadChallengeFromLiteral(example)
	got := twoSum(input)
	assert.Equal(t, 514579, got)
}

func TestThreeSum(t *testing.T) {
	input := challenge.ReadChallengeFromLiteral(example)
	got := threeSum(input)
	assert.Equal(t, 241861950, got)
}

func TestPartOne(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day01.input")
	got := twoSum(input)
	assert.Equal(t, 878724, got)
}

func TestPartTwo(t *testing.T) {
	input := challenge.ReadChallengeFromFile("./day01.input")
	got := threeSum(input)
	assert.Equal(t, 201251610, got)
}
